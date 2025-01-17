from django.contrib.auth.models import User
from django.db import models
from django.db.models import ForeignKey


class Car(models.Model):
    user = ForeignKey(User, on_delete=models.CASCADE)

    car_picture = models.ImageField(upload_to='car_pictures')
    car_brand = models.CharField(max_length=128)
    car_model = models.CharField(max_length=128)
    car_year = models.IntegerField(blank=True, null=True)
    car_description = models.TextField(blank=True)
