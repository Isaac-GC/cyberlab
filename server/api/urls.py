from django.contrib import admin
from django.urls import path, include
# from rest_framework.routers import DefaultRouter

from .views import ModulesView, LabTaskView
from .views import profile_view
from . import views
from . import jwt_views



admin.autodiscover()

# app_name = "api"
urlpatterns = [
    path("profile/", profile_view.Profile.as_view(), name="profile"),
    path('token/', jwt_views.Login.as_view(), name='token'),
    path('token/refresh/', jwt_views.RefreshToken.as_view(), name='token_refresh'),
    path('token/logout/', jwt_views.Logout.as_view(), name='logout'),
    path("api-auth/", include('rest_framework.urls')),
    # path('admin/', admin.site.urls),
]


# Import custom models and content
urlpatterns += [
    path("modules/", ModulesView.as_view(), name="modules"),
    path("lab_tasks/", LabTaskView.as_view(), name="lab_task"),
]