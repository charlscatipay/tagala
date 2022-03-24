from rest_framework.views import APIView # allow us to use the request.data medthod
from rest_framework.response import Response
from rest_framework import status

from django.views.generic import TemplateView
from django.http import JsonResponse
from django.db import transaction
from .models import Profile, LoginCredentials
from django.contrib.auth.models import User
from django.contrib import auth


class Register(TemplateView):
    template_name = 'register/register.html'

class Save(APIView):
    def post(self, request):
        return_data = {}
        data = request.data
        print(data)

        if self.email_exist(data['email']):
            return_data['err_code'] = 0
            return_data['result'] = 'Email Address already exist'
        elif self.username_exist(data['username']):
            return_data['err_code'] = 0
            return_data['result'] = 'Username is taken'
        else:
            with transaction.atomic(): # kung naay error sa query dili sha e save sa DB
                new_profile = Profile.objects.create(
                    firstname = data['firstname'],
                    lastname = data['lastname'],
                    email = data['email'],
                    location = data['location']
                )

                new_login_credentials = LoginCredentials.objects.create(
                    username = data['username'],
                    password = data['password1'],
                    profile = Profile.objects.get(firstname=data['firstname'])
                )    

                new_user = User.objects.create_user(
                    username = new_login_credentials.username,
                    password = new_login_credentials.password,
                    email = new_profile.email,
                    first_name = new_profile.firstname,
                    last_name = new_profile.lastname
                )

                return_data['err_code'] = 1
                return_data['result'] = 'Success!'

        return Response(return_data)

    def email_exist(self, email_data):
        email_count = len(Profile.objects.filter(email=email_data))
        return False if email_count == 0 else True

    def username_exist(self, username_data):
        username_count = len(LoginCredentials.objects.filter(username=username_data))
        return False if username_count == 0 else True

# ORMS Gitlab Docs
# https://docs.python.en.sdacademy.pro/backend_technologies/2_orm/

