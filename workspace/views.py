from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status

from workspace.serializers import UserSerializer, LabTaskSerializer, LabTaskStatusSerializer

from .models import LabModule, LabTask, LabTaskStatus

@login_required
def index(request):
    module_list = LabModule.objects.order_by('title')
    context = { 'modules_list' : module_list }
    return render(request, 'workspace.html', context)

@login_required
def module_details(request, module_url_title, task_id):
    all_modules = LabModule.objects.all()
    # all_tasks   = LabTask.objects.all()


    module_details = None
    for module in all_modules:
        if module.title.replace(" ", "-").lower() == module_url_title:
            module_details = module

    all_tasks = LabTask.objects.filter(lab_module__title=module_details.title)

    # This needs to be improved/optimized -> Currently a hack to ensure the right suburl is returned
    request_path = request.path_info.replace('/','').replace('workspace','')


    current_task = 0
    if task_id != 0:
        current_task = LabTask.objects.filter(id=task_id)


    context = {
         'all_modules' : all_modules,
         'module_details' : module_details,
         'request_path': request_path,
         'lab_tasks' : all_tasks,
         'task_info' : current_task
          }
    return render(request, 'workspace.html', context)


@api_view(['GET'])
def task_list(request):
    
    if request.method == 'GET':
        tasks = LabTask.objects.all()
        serializer = LabTaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def task_detail(request, pk):
    
    try:
        task = LabTask.objects.get(pk=pk)
    except LabTask.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = LabTaskSerializer(task)
        return JsonResponse(serializer.data)





class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LabTaskViewSet(viewsets.ModelViewSet):
    queryset = LabTask.objects.all()
    serializer_class = LabTaskSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LabTaskStatusViewSet(viewsets.ModelViewSet):
    queryset = LabTaskStatus.objects.all()
    serializer_class = LabTaskStatus
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# @login_required
# def module_overview(request, module_url_title):
#     return HttpResponse(f"Looking at {module_url_title}")