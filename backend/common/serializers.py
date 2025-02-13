from rest_framework import serializers
from backend.common.models import Car, CarQrCode
from backend.rating.models import CarRating as CarRatingModel


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['user','car_brand', 'car_model', 'car_year', 'car_description', 'car_picture', 'slug']

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


