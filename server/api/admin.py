from django.contrib import admin
from django.contrib.auth import (
    admin as auth_admin,
    get_user_model,
    
)

from . import models

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    pass


# admin.site.unregister(User)
# admin.site.register(models.User)
