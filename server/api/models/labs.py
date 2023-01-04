from django.db import models

class Lab(models.Model):
    lab_title = models.CharField(max_length=100)
    lab_status = models.IntegerField()