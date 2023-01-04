from django.db import models

class Role(models.Model):
    role_title = models.CharField(max_length=100)
    is_admin  = models.BooleanField
    is_moderator = models.BooleanField
    is_lab_admin = models.BooleanField
    is_lab_moderator = models.BooleanField
    is_reviewer = models.BooleanField