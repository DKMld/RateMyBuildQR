from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.common.models import Car
from backend.common.serializers import CarSerializer


@api_view(['GET'])
def home_page(request):

    data = {
        'message': 'Hello World!',
    }

    return Response(data)


@api_view(['GET'])
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


class UserCars(APIView):
    permission_classes([IsAuthenticated])

    def post(self, request, username):
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
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, username):
        user_cars = Car.objects.filter(user=request.user)
        serializer = CarSerializer(user_cars, many=True)
        print(user_cars)
        print(serializer.data)
        data = {
            'user_cars' : serializer.data  ,
        }

        return Response(data, status=status.HTTP_200_OK)



