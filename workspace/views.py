from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render


from .models import LabModule,LabTask

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
    if task_id is not 0:
        current_task = LabTask.objects.filter(id=task_id)


    context = {
         'all_modules' : all_modules,
         'module_details' : module_details,
         'request_path': request_path,
         'lab_tasks' : all_tasks,
         'task_info' : current_task
          }
    return render(request, 'workspace.html', context)

@login_required
def module_overview(request, module_url_title):
    return HttpResponse(f"Looking at {module_url_title}")