from django.urls import path
from . import views, login, register, logout
from django.contrib.auth.decorators import login_required

app_name = 'users'

urlpatterns = [
    path('', login.Login.as_view(), name='login'),
    path('submit/', login.Submit.as_view(), name='login-submit'),
    path('register/', login_required(register.Register.as_view()), name='register'),
    path('save/', register.Save.as_view(), name='register-save'),
    path('logout/', logout.Logout.as_view(), name='logout'),
    path('sample/', views.SampleData, name='sample')
]