from django.urls import path
from . import views

urlpatterns = [
    path('companies/', views.manage_companies_view, name='admin-companies'),
    path('drives/', views.approve_drives_view, name='admin-drives'),
    path('results/', views.analytics_view, name='admin-results'),
]
