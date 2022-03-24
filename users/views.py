from rest_framework.views import APIView # allow us to use the request.data medthod
from rest_framework.response import Response

from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.http import JsonResponse
import json

# Create your views here.
def SampleData(request):
    if request.method == 'POST':
        print('Hey')
        print(request.data)
        data = {'Name':'Charls', 'Age':'18'}
        
        return JsonResponse(data)
    s = request.GET.get('s', '')
    if request.method == 'POST':
        data = json.dumps(request.POST)
        context = json.loads(data)
        print(f'DATA from Module.js: {request.data}')
        return JsonResponse({'Name':'Charls', 'Age':'18'})