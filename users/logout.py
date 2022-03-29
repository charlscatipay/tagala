from rest_framework.views import APIView # allow us to use the request.data method
from rest_framework.response import Response
from rest_framework import status

from django.contrib import auth

class Logout(APIView):
    def post(self, request):
        print('Logout!')
        auth.logout(request)
        return Response({'Result': 'Logging Out!'})