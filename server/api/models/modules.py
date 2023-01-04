from django.db import models

from . import labs

class LabModule(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    lab = models.ForeignKey(labs.Lab, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    @property
    def module_url_title(self):
        return self.title.replace(" ", "-").lower()