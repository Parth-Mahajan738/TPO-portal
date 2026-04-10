from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .models import JobPosting
from .serializers import JobPostingSerializer

class JobPostingViewSet(viewsets.ModelViewSet):
    serializer_class = JobPostingSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Admin and Students can see all, Recruiters only see their own
        if self.request.user.role == 'recruiter':
            return JobPosting.objects.filter(recruiter=self.request.user).order_by('-posted_date')
        return JobPosting.objects.all().order_by('-posted_date')

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

