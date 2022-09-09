from django.db import models

from . import modules

class LabTask(models.Model):
    task_name    = models.CharField(max_length=100)
    task_details = models.CharField(max_length=10000)
    lab_module   = models.ForeignKey(modules.LabModule, on_delete=models.CASCADE)
    uses_vm      = models.BooleanField()
    uses_md      = models.BooleanField()
    terminal1    = models.CharField(max_length=50)
    terminal2    = models.CharField(max_length=50)
    terminal3    = models.CharField(max_length=50)
    terminal4    = models.CharField(max_length=50)
    custom_text  = models.CharField(max_length=10000)

    def __str__(self):
        return self.task_name

    @property
    def task_url_title(self):
        return self.task_name.replace(" ", "-").lower()