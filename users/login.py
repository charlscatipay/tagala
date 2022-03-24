from rest_framework.views import APIView # allow us to use the request.data medthod
from rest_framework.response import Response
from rest_framework import status

from django.views.generic import TemplateView
from django.http import JsonResponse
import json

class Login(TemplateView):
    template_name = 'login/login.html'

class Submit(APIView):
    def post(self, request):
        data = request.data
        print(f'DATA: {type(data)}')
        return JsonResponse(data)