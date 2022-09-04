from django.urls import path, include

from . import views


app_name = "workspace"
urlpatterns = [
    path('', views.index, name='index'),
    path('<str:module_url_title>/', views.module_details, name='overview'),
    path('lab_tasks/', views.task_list),
    path('lab_task/<int:pk>', views.task_detail),
]