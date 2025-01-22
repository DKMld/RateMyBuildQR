from rest_framework import serializers
from backend.rating.models import CarRating


class CarRatingSerializer(serializers.ModelSerializer):
    # rated_by = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = CarRating
        fields = ['car', 'rating', 'rated_by', 'comment']

    def create(self, validated_data):

        car = validated_data.get('car')
        rated_by = validated_data.get('rated_by', 'AnonymousUser')
        rating = validated_data.get('rating')
        comment = validated_data.get('comment')

        car_rated = CarRating.objects.create(
            car=car,
            rated_by=rated_by,
            rating=rating,
            comment=comment,

        )

        return car_rated