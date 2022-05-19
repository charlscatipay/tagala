from django.urls import path
from . import groups, views
from django.contrib.auth.decorators import login_required

app_name = 'backoffice'

urlpatterns = [
    path('', login_required(views.Dashboard.as_view(template_name='base/base.html')), name=''),
    path('dashboard/', login_required(views.Dashboard.as_view(template_name='dashboard/dashboard.html')), name='dashboard'),
    path('setup/groups/', login_required(groups.Groups.as_view(template_name='setup/groups/groups.html')), name='groups'),

    path('group/search/', groups.Search.as_view(), name='search'),
    path('group/new/', groups.New.as_view(), name='new-group'),
]