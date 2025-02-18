from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import MaxLengthValidator, MinLengthValidator, RegexValidator
from rest_framework import serializers
import re

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def validate_username(self, value):
        special_char_validator = RegexValidator(
            regex=r'^(?=(.*[A-Za-z]){4})(?=.*[A-Z])(?=.*[@._])[A-Za-z\d@._]+$',
            message="Username must contain at least 4 letters, 1 uppercase letter, and 1 of the special characters: @, ., or _."
        )
        min_len_validator = MinLengthValidator(limit_value=8)
        max_len_validator = MaxLengthValidator(limit_value=64)
        unicode_validator = UnicodeUsernameValidator()

        special_char_validator(value)
        unicode_validator(value)
        min_len_validator(value)
        max_len_validator(value)

        return value


    def validate_password(self, value):
        username = self.initial_data.get('username', '')
        if value == username:
            raise serializers.ValidationError("Password cannot be the same as the username.")
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")

        return value


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

        return data


