from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField("Name of User", blank=True, max_length=255)
