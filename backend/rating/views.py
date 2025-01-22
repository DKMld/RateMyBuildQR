from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.common.models import Car
from backend.common.serializers import CarSerializer
from backend.rating.serializers import CarRatingSerializer


class CarRating(APIView):

    def get(self, request, *args, **kwargs):
        car = Car.objects.filter(slug=kwargs['car_slug']).get()

        car_data = {
            'user': car.user.id,
            'car_brand': car.car_brand,
            'car_model': car.car_model,
            'car_year': car.car_year,
            'car_description': car.car_description,
            'car_picture': car.car_picture,
        }
        serializer = CarSerializer(data=car_data)

        if serializer.is_valid():

            data = {
                'car_info': serializer.data,
            }

            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def post(self,request, *args, **kwargs):
        car = Car.objects.filter(slug=kwargs['car_slug']).get()

        car_rating_data = {
            'car': car.pk,
            'rated_by': request.user.username,
            'rating': request.data['rating'],
            'comment': request.data['comment'],

        }
        serializer = CarRatingSerializer(data=car_rating_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

