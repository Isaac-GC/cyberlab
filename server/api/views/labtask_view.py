from rest_framework import generics, response, serializers
from rest_framework.permissions import IsAuthenticated

from ..models import labtask
from ..models import labtaskstatus


class LabTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = labtask.LabTask
        fields = (
            "id",
            "task_name",
            "task_details",
            "lab_module"
        )


class LabTaskView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class   = LabTaskSerializer

    def get_context_data(self):
        



    # def get_object(self):
    #     return self.request.user
