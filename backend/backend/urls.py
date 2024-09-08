from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),  # OAuth2 authentication routes
    path('api/', include('tasks.urls')),  # Task management API routes
]