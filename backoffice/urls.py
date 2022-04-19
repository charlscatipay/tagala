from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required

app_name = 'backoffice'

urlpatterns = [
    path('', login_required(views.Dashboard.as_view(template_name='base/base.html')), name=''),
    path('dashboard/', login_required(views.Dashboard.as_view(template_name='dashboard/dashboard.html')), name='dashboard'),
]