from django.http import HttpResponse
from django.shortcuts import render

from .models import LabModule,LabTask

def index(request):
    module_list = LabModule.objects.order_by('title')
    context = { 'modules_list' : module_list }
    return render(request, 'index.html', context)

def module_details(request, module_url_title):
    return HttpResponse(f"Looking at {module_url_title}")

def module_overview(request, module_url_title):
    return HttpResponse(f"Looking at {module_url_title}")