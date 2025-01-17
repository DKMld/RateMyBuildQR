from django.urls import path
from backend.accounts import views as accounts_views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/register', accounts_views.register, name='register page'),
    path('api/login', accounts_views.login_view, name='login user'),
    path('api/logout', accounts_views.logout, name='logout user'),
]