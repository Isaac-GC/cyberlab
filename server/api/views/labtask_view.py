from rest_framework import generics, response, serializers
from rest_framework.permissions import IsAuthenticated

from ..models import labtask


class LabTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = labtask.LabTask
        fields = (
            "id",
            "task_name",
            "task_details",
            "lab_module",
            "uses_vm",
            "uses_md",
            "terminal1",
            "terminal2",
            "terminal3",
            "terminal4",
            "custom_text",
        )


class LabTaskView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class   = LabTaskSerializer

    def get_object(self):
        return self.request.user