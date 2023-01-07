from django.db import models

from django.contrib.auth.models import ( 
    BaseUserManager, AbstractBaseUser
)

from . import group

class UserManager(BaseUserManager):

    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(
            email = self.normalize_email(email),
            username  = username
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(
            email,
            username,
            password=password
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField("Username", unique=True, max_length=255)
    first_name = models.CharField("First Name", blank=True, max_length=255)
    last_name = models.CharField("Last Name", blank=True, max_length=255)
    email = models.CharField("Email", unique=True, max_length=255)
    # group = models.ManyToManyField(group.Group)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True
