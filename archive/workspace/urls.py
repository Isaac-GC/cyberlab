from email.mime import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'lab_tasks', views.LabTaskViewSet, basename='lab_tasks')
router.register(r'lab_task_status', views.LabTaskStatusViewSet, basename='lab_tasks_status')
router.register(r'users', views.UserViewSet, basename='users')

app_name = "workspace"
urlpatterns = [
    path('', include(router.urls)),
    # path('<str:module_url_title>/', views.module_details, name='overview'),
    # path('lab_tasks/', views.task_list),
    # path('lab_task/<int:pk>', views.task_detail),
]