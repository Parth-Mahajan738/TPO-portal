from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import User

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username_or_email = data.get('username') or data.get('email') # Check both fields
            password = data.get('password')
            
            # ADVANCED: Dual Login Logic (Username OR Email)
            # 1. We check if the input string contains an '@'.
            # 2. If yes, we look up the username associated with that email in the DB.
            # 3. We overwrite 'username_or_email' with the actual username because 
            #    Django's authenticate() function expects a username by default.
            if '@' in username_or_email:
                try:
                    user_obj = User.objects.get(email=username_or_email)
                    username_or_email = user_obj.username
                except User.DoesNotExist:
                    # Security Consideration: We pass here to avoid "User Enumeration Attacks".
                    # If we returned "Email not found", hackers would know which emails exist.
                    pass

            # authenticate(): Handles hashing the password and comparing it to the stored hash.
            # It returns a User object if valid, or None if invalid.
            user = authenticate(request, username=username_or_email, password=password)
            
            if user is not None:
                login(request, user)
                return JsonResponse({
                    "message": "Login successful",
                    "role": user.role,
                    "username": user.username
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
            username = data.get('username')
            password = data.get('password')
            email = data.get('email', '') # Capture email from request
            role = data.get('role', 'student') 
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({"message": "Username already taken"}, status=400)
            
            user = User.objects.create_user(username=username, email=email, password=password, role=role)
            return JsonResponse({"message": "Registration successful"}, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

    return JsonResponse({"message": "Register endpoint allows POST only"}, status=405)

def profile_view(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "username": request.user.username,
            "role": request.user.role,
            "message": "Profile details"
        }, status=200)
    return JsonResponse({"message": "Not authenticated"}, status=401)  

def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"}, status=200)
