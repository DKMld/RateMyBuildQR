from django.urls import path
from backend.rating import views as rating_views

urlpatterns = [
    path('api/<str:username>/cars/<slug:car_slug>/rate', rating_views.CarRating.as_view(), name='car rating'),
]