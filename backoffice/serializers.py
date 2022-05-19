from rest_framework import serializers
from .models import M_Groups

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = M_Groups
        fields = '__all__'