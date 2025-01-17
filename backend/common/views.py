from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.common.serializers import PostCarSerializer


@api_view(['GET'])
def home_page(request):

    data = {
        'message': 'Hello World!',
    }

    return Response(data)


@api_view(['GET'])
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


@api_view(['POST'])
def post_car(request, user):
    serializer = PostCarSerializer(data=request.data, context={'request': request})

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)