from django.db import models
from django.conf import settings

class JobPosting(models.Model):
    recruiter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='job_postings')
    job_title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=2000)
    job_description = models.TextField()
    qualifications = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    job_type = models.CharField(max_length=50, default='Full-time')
    location = models.CharField(max_length=200)
    application_deadline = models.DateField()
    posted_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"
