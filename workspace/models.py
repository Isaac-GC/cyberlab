from turtle import mode
from django.db import models
from django.utils.translation import gettext_lazy as _

class LabModule(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.title
        
    @property
    def module_url_title(self):
        return self.title.replace(" ", "-").lower()

class LabTask(models.Model):
    task_name = models.CharField(max_length=100)
    lab_module = models.ForeignKey(LabModule, on_delete=models.CASCADE)


    class TaskStatus(models.TextChoices):
        NOT_DONE = 'ND', _('Not Done')
        FAILURE  = 'F', _('Failure')
        SUCCESS  = 'S', _('Success')
    
    task_status = models.CharField(
        max_length=2,
        choices=TaskStatus.choices,
        default=TaskStatus.NOT_DONE,
    )

    def __str__(self):
        return self.task_name