from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView

# Create your views here.
class Login(TemplateView):
    template_name = 'login/login.html'

    def post(self, request):
        print(f'DATA: {request.POST}')

class Register(TemplateView):
    template_name = 'register/register.html'

def SampleData(request):
    s = request.GET.get('s', '')
    print(f'TEST TEST TEST {s}')
    return HttpResponse(f'HEY {s}')