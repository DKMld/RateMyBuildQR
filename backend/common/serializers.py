from rest_framework import serializers
from backend.common.models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['user','car_brand', 'car_model', 'car_year', 'car_description', 'car_picture']
