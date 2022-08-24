from django.contrib import admin

from .models import LabModule, LabTask

admin.site.register(LabModule)
admin.site.register(LabTask)
