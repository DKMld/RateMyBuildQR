from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from backend.common.models import Car
from backend.rating.models import CarRating



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user







class LoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials or user does not exist', code='authentication')
        else:
            raise serializers.ValidationError('Please provide both username and password', code='authentication')

        # this returns USERNAME AND PASSWORD of input fields of the frontend
        return data






# class GetUserCarSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Car
#         fields = '__all__'
#
#
# class GetCarRatingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CarRating
#         fields = '__all__'

