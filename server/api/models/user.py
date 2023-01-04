from django.db import models

from django.contrib.auth.models import AbstractUser

from . import group

class User(AbstractUser):
    name = models.CharField("Name of User", blank=True, max_length=255)
    group = models.ForeignKey(group.Group, on_delete=models.SET_NULL, null=True)
