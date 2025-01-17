from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ObjectDoesNotExist
from django.db import models



# class UserManager(BaseUserManager):
#     def create_user(self, username, password=None, **extra_fields):
#         """
#         Creates and returns a regular user with a username and password.
#         """
#         if not username:
#             raise ValueError("The given username must be set")
#
#         user = self.model(username=username, **extra_fields)
#
#         # Set password if provided
#         if password:
#             user.set_password(password)
#         user.save(using=self._db)
#         return user
#
#     def create_superuser(self, username, password=None, **extra_fields):
#         """
#         Creates and returns a superuser with a username and password.
#         """
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#
#         return self.create_user(username, password, **extra_fields)



# class CustomUser(AbstractUser):
#     pass
    # username = models.CharField(max_length=128, unique=True, blank=False, null=False)
    #
    # USERNAME_FIELD = 'username'  # Set the field to be used for authentication
    # REQUIRED_FIELDS = []

    # objects = UserManager()


# def authenticate(username=None, password=None):
#     try:
#         user = CustomUser.objects.get(username=username)
#         if check_password(password, user.password):
#             return user
#         return None
#     except ObjectDoesNotExist:
#         return None




