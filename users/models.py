from email.policy import default
from django.db import models

# Create your models here.
class Profile(models.Model):
    profile_id = models.BigAutoField(primary_key=True)
    firstname = models.CharField(max_length=120)
    lastname = models.CharField(max_length=120)
    email = models.CharField(max_length=120, default=None)
    location = models.CharField(max_length=120)
    date_added = models.DateTimeField(auto_now_add=True)
    addedby_user_id = models.BigIntegerField()
    updatedby_user_id = models.BigIntegerField(
        null=True,
        blank=True
    )
    data_updated = models.DateTimeField(
        null=True,
        blank=True,
        default=None
    )

class LoginCredentials(models.Model):
    login_credentials_id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    profile = models.ForeignKey(Profile, null=True, on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(default=True)
    date_added = models.DateTimeField(auto_now_add=True)
    addedby_user_id = models.BigIntegerField(default=1)
    updatedby_user_id = models.BigIntegerField(
        null=True,
        blank=True
    )
    data_updated = models.DateTimeField(
        null=True,
        blank=True,
        default=None
    )