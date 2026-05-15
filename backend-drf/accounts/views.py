from django.shortcuts import render
from .models import User
from .serializers import UserRegistrationSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]