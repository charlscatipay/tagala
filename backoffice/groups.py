from traceback import print_tb
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import GroupSerializer

from .models import M_Groups

# Create your views here.

class Groups(TemplateView):
    template_name = 'base/base.html'

class Search(APIView):
    def get(self, request):
        search_value = request.GET.get('SearchValue', '')
        list_data = {}

        queryset = M_Groups.objects.select_related().filter(
            GroupName__icontains = search_value
        )
        groups = list(queryset.values('GroupID', 'GroupName', 'GroupCode', 'ReferenceTableStatusID'))
        print(groups)
        list_data['Result'] = 1
        list_data['Data'] = groups
        return Response(list_data)

class New(APIView):
    def post(self, request):
        raw_data = request.data
        list_data = {}
        print(raw_data['GroupName'], raw_data['GroupCode'])

        print(M_Groups.objects.filter(GroupName=raw_data['GroupName']).exists())

        with transaction.atomic():
            try:
                if M_Groups.objects.filter(GroupName=raw_data['GroupName']).exists():
                    raise Exception('Group already exist')
                elif M_Groups.objects.filter(GroupCode=raw_data['GroupCode']).exists():
                    raise Exception('Group Code already in use')
            except Exception as e:
                list_data['ErrorMessage'] = str(e)
                list_data['Result'] = 0
                return Response(list_data)
            else:
                group_id = 1 if M_Groups.objects.count() == 0 else M_Groups.objects.last().GroupID + 1
                raw_data['GroupID'] = group_id
                raw_data['AddedByUserID'] = request.user.id
                new_group  = GroupSerializer(data=raw_data)

                if new_group.is_valid(raise_exception=True):
                    new_group.save()
                    list_data['Data'] = new_group.data
                    list_data['Result'] = 1
                    return Response(list_data)
                else: 
                    transaction.set_rollback(True)
                    list_data['Result'] = 0
                    list_data['ErrorMessage'] = 'Contact your administrator'
                    list_data['ErrorData'] = new_group.errors
                    return Response(list_data ,status=status.HTTP_400_BAD_REQUEST)

        

