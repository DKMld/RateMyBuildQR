from rest_framework import serializers
from backend.common.models import Car, CarQrCode


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['user','car_brand', 'car_model', 'car_year', 'car_description', 'car_picture', 'slug']


class QRcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarQrCode
        fields = ['car', 'qrcode', 'qrcode_link']


    def create(self, validated_data):
        car = validated_data.get('car')
        qrcode = validated_data.get('qrcode')
        qrcode_link = validated_data.get('qrcode_link')

        car, created = CarQrCode.objects.get_or_create(car=car.pk,
                                                       defaults={
                                                           'qrcode': qrcode,
                                                           'qrcode_lin':qrcode_link}
                                                       )

        return car

