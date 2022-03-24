from django.urls import path
from . import views, login, register

app_name = 'users'

urlpatterns = [
    path('', login.Login.as_view(), name='login'),
    path('submit/', login.Submit.as_view(), name='login-submit'),
    path('register/', register.Register.as_view(), name='register'),
    path('save/', register.Save.as_view(), name='register-save'),
    path('sample/', views.SampleData, name='sample')
]