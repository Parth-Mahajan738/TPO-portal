from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username_or_email = data.get('username') or data.get('email')
            password = data.get('password')
            requested_role = data.get('role')

            # Dual Login: support both username and email
            if '@' in username_or_email:
                try:
                    user_obj = User.objects.get(email=username_or_email)
                    username_or_email = user_obj.username
                except User.DoesNotExist:
                    pass  # Avoid user enumeration — fall through to authenticate() which will return None

            user = authenticate(request, username=username_or_email, password=password)

            if user is not None:
                # Ensure they are logging in from the correct portal for their role
                if requested_role and user.role != requested_role:
                    return JsonResponse({"message": "Invalid credentials for the selected portal type."}, status=403)

                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return JsonResponse({
                    "message": "Login successful",
                    "role": user.role,
                    "username": user.username,
                    "token": token.key
                }, status=200)
            else:
                return JsonResponse({"message": "Invalid credentials"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON"}, status=400)

    return JsonResponse({"message": "Login endpoint allows POST only"}, status=405)


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name = data.get('first_name', '')
            last_name = data.get('last_name', '')
            username = data.get('username')
            password = data.get('password')
            email = data.get('email', '')
            role = data.get('role', 'student')

            if User.objects.filter(username=username).exists():
                return JsonResponse({"message": "Username already taken"}, status=400)

            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                role=role,
                first_name=first_name,
                last_name=last_name
            )
            return JsonResponse({"message": "Registration successful"}, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    return JsonResponse({"message": "Register endpoint allows POST only"}, status=405)


# Token-protected: DRF returns 401 automatically if no valid token is sent
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile_view(request):
    return Response({
        "id": request.user.id,
        "first_name": request.user.first_name,
        "last_name": request.user.last_name,
        "username": request.user.username,
        "email": request.user.email,
        "role": request.user.role,
    })


def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"}, status=200)
