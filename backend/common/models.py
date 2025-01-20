from django.contrib.auth.models import User
from django.db import models
from django.db.models import ForeignKey
from django.template.defaultfilters import slugify


class Car(models.Model):
    user = ForeignKey(User, on_delete=models.CASCADE)

    car_picture = models.ImageField(upload_to='car_pictures')
    car_brand = models.CharField(max_length=128)
    car_model = models.CharField(max_length=128)
    car_year = models.IntegerField(blank=True, null=True)
    car_description = models.TextField(blank=True)

    slug = models.SlugField(null=True, unique=True, blank=True, max_length=200)

    def save(self, *args, **kwargs):
        super(Car, self).save(*args, **kwargs)
        if not self.slug:
            self.slug = slugify(str(self.car_brand) + '-' + str(self.car_model) + '-' + str(self.pk))
            self.save()



class CarQrCode(models.Model):
    car = ForeignKey(Car, on_delete=models.CASCADE)

    qrcode = models.ImageField(upload_to='qrcodes')
    qrcode_link = models.CharField(max_length=128, blank=True, null=True)
