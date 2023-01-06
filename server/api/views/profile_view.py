from rest_framework import generics, response, serializers
from rest_framework.permissions import IsAuthenticated

from ..models import user as user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_model.User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "last_login",
            "is_admin"
        )



class Profile(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class   = UserSerializer

    def get_object(self):
        return self.request.user
