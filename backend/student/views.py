from django.http import JsonResponse

def dashboard_view(request):
    return JsonResponse({"message": "Student Dashboard Data"}, status=200)

def applications_view(request):
    return JsonResponse({"message": "List of student applications"}, status=200)
