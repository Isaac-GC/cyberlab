from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

from . import labtask, user

class LabTaskStatus(models.Model):
    user_id = models.ForeignKey(user.User, on_delete=models.CASCADE)
    task_id = models.ForeignKey(labtask.LabTask, on_delete=models.CASCADE)

    class TaskStatus(models.TextChoices):
        NOT_DONE = 'ND', _('Not Done')
        FAILURE  = 'F', _('Failure')
        SUCCESS  = 'S', _('Success')
    
    task_status = models.CharField(
        max_length=2,
        choices=TaskStatus.choices,
        default=TaskStatus.NOT_DONE,
    )

    @property
    def task_status_name(self):
        return self.TaskStatus(self.task_status).label
