from django.contrib import admin
from .models import M_Reference, M_Groups

# Register your models here.

@admin.register(M_Reference)
class ReferenceAdmin(admin.ModelAdmin):
    list_display = ('ReferenceID', 'ReferenceGroup', 'ReferenceLongDescription')
    ordering = ('ReferenceID',)

@admin.register(M_Groups)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('GroupID', 'GroupName', 'GroupCode')
    ordering = ('GroupID',)