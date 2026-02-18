from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def post_job_view(request):
    if request.method == 'POST':
        return JsonResponse({"message": "Job posted successfully"}, status=201)
    return JsonResponse({"message": "Post Job endpoint"}, status=200)

def applicants_view(request):
    return JsonResponse({"message": "List of applicants for posted jobs"}, status=200)
