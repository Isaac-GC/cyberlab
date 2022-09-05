from django.shortcuts import render

from rest_framework import generics, response
from rest_framework.permissions import IsAuthenticated

from . import serializers


class Profile(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated)
    serializer_class   = serializers.User

    def get_object(self):
        return super.request.user
