from django.http import HttpResponse
from django.shortcuts import render

from .models import LabModule,LabTask

def index(request):
    module_list = LabModule.objects.order_by('title')
    context = { 'modules_list' : module_list }
    return render(request, 'index.html', context)

def module_details(request, module_url_title):
    all_modules = LabModule.objects.all()

    module_details = None
    for module in all_modules:
        if module.title.replace(" ", "-").lower() == module_url_title:
            module_details = module

    all_tasks   = LabTask.objects.filter(lab_module__title=module_details.title)

    context = {
         'module_details' : module_details,
         'lab_tasks' : all_tasks
          }
    return render(request, 'module_details.html', context)

def module_overview(request, module_url_title):
    return HttpResponse(f"Looking at {module_url_title}")