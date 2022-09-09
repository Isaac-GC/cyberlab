from rest_framework import generics, response, serializers
from rest_framework.permissions import IsAuthenticated

from ..models import modules


class ModulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = modules.LabModule
        fields = (
            "id",
            "title",
            "description",
        )


class ModulesView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class   = ModulesSerializer

    def get_object(self):
        return self.request.user