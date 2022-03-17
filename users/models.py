from django.db import models

# Create your models here.
class Profile(models.Model):
    profile_id = models.BigAutoField(primary_key=True)
    firstname = models.CharField(max_length=120)
    lastname = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    date_added = models.DateTimeField(auto_now_add=True)

class LoginCredentials(models.Model):
    login_credentials_id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    profile = models.ForeignKey(Profile, null=True, on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(default=True)