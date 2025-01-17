# Generated by Django 5.1.4 on 2025-01-16 16:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('car_picture', models.ImageField(upload_to='car_pictures')),
                ('car_brand', models.CharField(max_length=128)),
                ('car_model', models.CharField(max_length=128)),
                ('car_year', models.IntegerField(blank=True, null=True)),
                ('car_description', models.TextField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
