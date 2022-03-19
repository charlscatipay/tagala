from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.http import JsonResponse
import json

# Create your views here.
class Login(TemplateView):
    template_name = 'login/login.html'

    def post(self, request):
        print(f'DATA: {request.POST}')

class Register(TemplateView):
    template_name = 'register/register.html'

def SampleData(request):
    print(request.POST)
    
    return JsonResponse({'Name':'Charls', 'Age':'18'})
    s = request.GET.get('s', '')
    if request.method == 'POST':
        data = json.dumps(request.POST)
        context = json.loads(data)
        print(f'DATA from Module.js: {request.data}')
        return JsonResponse({'Name':'Charls', 'Age':'18'})