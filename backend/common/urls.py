from django.urls import path
from backend.common import views as common_views



urlpatterns = [
    path('api/home/', common_views.home_page, name='home page'),
    path('api/csrf/', common_views.csrf, name='csrf'),
    path('api/<str:username>/post_car', common_views.post_car, name='post car'),
]