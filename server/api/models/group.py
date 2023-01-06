from django.db import models

from . import role

class Group(models.Model):
    group_title = models.CharField(max_length=100)
    roles = models.ManyToManyField(role.Role)