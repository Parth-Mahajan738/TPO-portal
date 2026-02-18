from django.urls import path
from . import views

urlpatterns = [
    path('post-job/', views.post_job_view, name='recruiter-post-job'),
    path('applicants/', views.applicants_view, name='recruiter-applicants'),
]
