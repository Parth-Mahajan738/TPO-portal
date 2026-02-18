from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    IS_STUDENT = 'student'
    IS_RECRUITER = 'recruiter'
    IS_TPO = 'tpo'
    
    ROLE_CHOICES = [
        (IS_STUDENT, 'Student'),
        (IS_RECRUITER, 'Recruiter'),
        (IS_TPO, 'TPO Admin'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=IS_STUDENT)

    def is_student(self):
        return self.role == self.IS_STUDENT

    def is_recruiter(self):
        return self.role == self.IS_RECRUITER

    def is_tpo(self):
        return self.role == self.IS_TPO
