from django.urls import path

from . import views


app_name = "landing"
urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.home, name='home'),
    path('settings', views.settings, name='settings'),
]