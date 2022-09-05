from django.contrib import admin
from django.urls import path, include
# from rest_framework.routers import DefaultRouter

from . import views
from . import jwt_views

admin.autodiscover()

# app_name = "api"
urlpatterns = [
    path("me/", views.Profile.as_view(), name="me"),
    path('token/', jwt_views.Login.as_view(), name='token'),
    path('token/refresh/', jwt_views.RefreshToken.as_view(), name='token_refresh'),
    path('token/logout/', jwt_views.Logout.as_view(), name='logout'),
    # path('admin/', admin.site.urls),
]