from django.urls import path

from . import views


app_name = "workspace"
urlpatterns = [
    path('', views.index, name='index'),
    path('<str:module_url_title>/', views.module_overview, name='overview'),
    path('<str:module_url_title>/detail', views.module_overview),
]