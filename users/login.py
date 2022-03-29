from rest_framework.views import APIView # allow us to use the request.data method
from rest_framework.response import Response
from rest_framework import status

from django.views.generic import TemplateView
from django.http import JsonResponse
from django.contrib import auth
import json

class Login(TemplateView):
    template_name = 'login/login.html'
    # next = request.GET.get('next',)
    # print(f'Next: {next}')

class Submit(APIView):
    def post(self, request):
        data = request.data
        next = data['next']
        next_url = next[next.find("=")+1:]

        if len(next_url) > 1:
            return_data = {'next': next_url}
        else:
            return_data = {'next': None}
            
        user = auth.authenticate(
            username = data["username"],
            password = data["password"]
        )

        if user is not None:
            auth.login(request, user)

            return_data['err_code'] = 1
            return_data['Result'] = 'Logged In'

            return Response(return_data)
        else:

            return_data['err_code'] = 0
            return_data['Result'] = 'User not found'

            return Response(return_data)

        print(f'DATA: {return_data}')
        print(request.build_absolute_uri())
        return_data['err_code'] = 1
        return JsonResponse(return_data)