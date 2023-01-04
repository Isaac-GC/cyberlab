from django.db import models

class Group(models.Model):
    group_tile = models.CharField(max_length=100)