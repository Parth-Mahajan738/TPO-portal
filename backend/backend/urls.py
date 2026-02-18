from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/student/', include('student.urls')),
    path('api/recruiter/', include('recruiter.urls')),
    path('api/admin/', include('tpo_admin.urls')),
]
