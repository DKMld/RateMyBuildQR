from django.urls import path
from backend.common import views as common_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/home/', common_views.home_page, name='home page'),
    path('api/csrf/', common_views.csrf, name='csrf'),
    path('api/<str:username>/cars', common_views.UserCars.as_view(), name='user car'),
    path('api/<str:username>/cars/<slug:car_slug>', common_views.CarQR.as_view(), name='car QR'),
]