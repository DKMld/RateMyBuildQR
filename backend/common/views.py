from io import BytesIO
from django.core.files.base import ContentFile
from django.shortcuts import   get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import qrcode
from backend.common.models import Car
from backend.common.serializers import CarSerializer, QRcodeSerializer


class UserCars(APIView):
    permission_classes([IsAuthenticated])

    def post(self, request, *args, **kwargs):
        car_data = {
            'user': request.user.id,
            'car_brand': request.data.get('car_brand'),
            'car_model': request.data.get('car_model'),
            'car_year': request.data.get('car_year'),
            'car_description': request.data.get('car_description'),
            'car_picture': request.FILES.get('car_picture'),
        }
        serializer = CarSerializer(data=car_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, *args, **kwargs):
        user_cars = Car.objects.filter(user=request.user)

        serializer = CarSerializer(user_cars, many=True)

        data = {
            'user_cars' : serializer.data ,
        }

        return Response(data, status=status.HTTP_200_OK)


    def delete(self, request, *args, **kwargs):
        pass
#     TODO delete button for user cars


class CarQR(APIView):
    permission_classes([IsAuthenticated])

    def get(self, request, *args, **kwargs):
        car = get_object_or_404(Car, slug=kwargs['car_slug'])

        full_path = request.get_full_path()
        modified_path = full_path.replace("/api", "")

        qr_code = qrcode.make(f"https://ratemybuildqr.com/{modified_path}/rate")
        buffer = BytesIO()
        qr_code.save(buffer, 'PNG')
        buffer.seek(0)
        qr_file = ContentFile(buffer.read(), name=f"{kwargs['username']}_{kwargs['car_slug']}.png")

        qr_data = {
            'car': car.pk,
            'qrcode': qr_file,
            'qrcode_link': request.get_full_path(),
        }

        serializer = QRcodeSerializer(data=qr_data)

        if serializer.is_valid():
            serializer.save()

            data = {
                'qr_code': serializer.data.get('qrcode'),
                'car_brand': car.car_brand,
                'car_model': car.car_model,
            }

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    def post(self, request, *args, **kwargs):
        pass



