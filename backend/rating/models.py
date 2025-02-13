from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from backend.common.models import Car


class CarRating(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)

    rated_by = models.CharField(max_length=128, null=True, blank=True)

    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def get_car_rating(car_instance) -> float:
        print(car_instance)
        car_ratings = CarRating.objects.filter(car=car_instance.pk).values_list('rating', flat=True)

        rating = 0.0

        if car_ratings:
            rating = sum(car_ratings) / len(car_ratings)

        return round(rating, 1)