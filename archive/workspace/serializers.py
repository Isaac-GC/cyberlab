from django.contrib.auth.models import User
from rest_framework import serializers

from . import models

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']



class LabTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LabTask
        fields = [
            'id',
            'task_name',
            'task_details',
            'uses_vm',
            'uses_md',
            'terminal1',
            'terminal2',
            'terminal3',
            'terminal4',
            'custom_text',
            ]

class LabTaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LabTask
        fields = [
            'id',
            'task_id',
            'task_status_name'
            ]