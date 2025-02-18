from django.core.validators import MinValueValidator, MinLengthValidator, FileExtensionValidator
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from backend.common.models import Car, CarQrCode
from backend.rating.models import CarRating as CarRatingModel


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['user','car_brand', 'car_model', 'car_year', 'car_description', 'car_picture', 'slug']


    def validate_car_brand(self, value):
        min_len_validator = MinLengthValidator(limit_value=3)
        min_len_validator(value)
        return value
    def validate_car_model(self, value):
        min_len_validator = MinLengthValidator(limit_value=3)
        min_len_validator(value)
        return value
    def validate_car_year(self, value):
        min_value_validator = MinValueValidator(1950)
        min_value_validator(value)
        return value
    def validate_car_picture(self, image):
        file_extension_validator = FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])
        file_extension_validator(image)
        max_size = 5 * 1024 * 1024  # 5MB limit
        if image.size > max_size:
            raise ValidationError(f"Image size should not exceed 5MB.")
        return image


    def to_representation(self, instance):
        data = super().to_representation(instance)

        rating_score = CarRatingModel.get_car_rating(car_instance=instance)
        data['rating_score'] = rating_score

        return data



class QRcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarQrCode
        fields = ['car', 'qrcode', 'qrcode_link']


    def create(self, validated_data):
        car = validated_data.get('car')
        qrcode = validated_data.get('qrcode')
        qrcode_link = validated_data.get('qrcode_link')

        car, created = CarQrCode.objects.get_or_create(
            car=car,

            defaults={
                'qrcode': qrcode,
                'qrcode_link':qrcode_link}
            )

        return car


