from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

# Create your views here.

class Groups(TemplateView):
    template_name = 'base/base.html'
