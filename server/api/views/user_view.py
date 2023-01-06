# from rest_framework import generics, response, serializers
# from rest_framework.permissions import IsAuthenticated

# from ..models import group as group_model
# from ..models import role as role_model
# from ..models import user as user_model

# class GroupSerializer(serializers.ModelSerializer):

#     class UserSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = user_model.User
#             fields = (  
#                 "id",
#                 "username",
#                 "name",
#                 "group",
#             )

#     class RoleSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = role_model.Role

#     userModel = UserSerializer()
#     roleModel = RoleSerializer()


#     class Meta:
#         model = group_model.Group
#         fields = '__all__'

#     def create(self, validated_data):
#         userData = validated_data.pop('userModel')
#         roleData = validated_data.pop('roleModel')
#         groupInstance = group_model.Group.objects.create(**validated_data)
#         user_model.User.objects.create(name=)


# class Profile(generics.RetrieveAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class   = UserSerializer

#     def get_object(self):
#         return self.request.user
