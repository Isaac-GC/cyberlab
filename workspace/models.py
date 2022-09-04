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
    task_name    = models.CharField(max_length=100)
    task_details = models.CharField(max_length=10000)
    lab_module   = models.ForeignKey(LabModule, on_delete=models.CASCADE)
    uses_vm      = models.BooleanField()
    uses_md      = models.BooleanField()
    terminal1    = models.CharField(max_length=50)
    terminal2    = models.CharField(max_length=50)
    terminal3    = models.CharField(max_length=50)
    terminal4    = models.CharField(max_length=50)
    custom_text  = models.CharField(max_length=10000)

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

    @property
    def task_url_title(self):
        return self.task_name.replace(" ", "-").lower()

    @property
    def task_status_name(self):
        return self.TaskStatus(self.task_status).label