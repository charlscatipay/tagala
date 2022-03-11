from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class Login(TemplateView):
    template_name = 'login/login.html'

class Register(TemplateView):
    template_name = 'register/register.html'