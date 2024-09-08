from rest_framework import serializers # type: ignore
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'completed', 'created_at']