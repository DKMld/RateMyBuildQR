from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from backend.common.models import Car


class CarRating(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    rated_by = models.CharField(max_length=128, null=True, blank=True)

    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)


    def get_car_rating(self) -> float:
        pass


    def get_times_rated(self) -> int:
        pass

