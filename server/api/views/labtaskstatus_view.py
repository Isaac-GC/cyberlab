from rest_framework import generics, response, serializers
from rest_framework.permissions import IsAuthenticated

from ..models import labtaskstatus


class LabTaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = labtaskstatus.LabTaskStatus
        fields = (
            "id",
            "user_id",
            "task_id",
            "task_status_name",
        )


class LabTaskStatusView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class   = LabTaskStatusSerializer

    def get_object(self):
        return self.request.user