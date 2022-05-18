from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import M_Groups

# Create your views here.

class Groups(TemplateView):
    template_name = 'base/base.html'

class Search(APIView):
    def get(self, request):
        search_value = request.GET.get('SearchValue', '')

        queryset = M_Groups.objects.select_related().filter(
            GroupName__icontains = search_value
        )
        groups = list(queryset.values('GroupName', 'GroupCode'))
        print(groups)
        list_data = {}
        list_data['Result'] = 1
        return Response(list_data)
