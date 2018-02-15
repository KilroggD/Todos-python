from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _

# Customize Users model


class MyUserManager(BaseUserManager):
    """
    A custom user manager to work with emails instead of usernames
    """

    def create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Customized User model itself
    """
    email = models.EmailField(unique=True, null=True)
    is_staff = models.BooleanField(
        default=False,
    )
    first_name = models.CharField(default='', max_length=60)
    last_name = models.CharField(default='', max_length=60)
    current_position = models.CharField(default='', max_length=64)
    bio = models.CharField(default='', max_length=255)
    department = models.ForeignKey('Department', on_delete=models.SET_NULL, null=True)
    country = models.ForeignKey('Country', on_delete=models.SET_NULL, null=True)
    USERNAME_FIELD = 'email'
    objects = MyUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

# Define additional Models
class Department(models.Model):
    """
    List of departments
    """
    name = models.CharField(max_length=140)

    class Meta:
        ordering = ['name']


class Country(models.Model):
    name = models.CharField(max_length=140)

    class Meta:
        ordering = ['name']



class Todo(models.Model):
    """
    Topic model for handling topics
    """
    name = models.CharField(max_length=140)
    descr = models.CharField(default='', max_length=255)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['name']
