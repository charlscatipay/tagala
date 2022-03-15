from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('', views.Login.as_view(), name='login'),
    path('register/', views.Register.as_view(), name='register')
]