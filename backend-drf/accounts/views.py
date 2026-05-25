from django.shortcuts import render
from .models import User
from .serializers import UserRegistrationSerializer, OwnProfileViewSerializer, OwnProfileEditSerializer, OtherUsersSerializer, OthersProfileSerailizer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from rest_framework.filters import SearchFilter


class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class OwnProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = OwnProfileViewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
class OwnProfileEditView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = OwnProfileEditSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def patch(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class OwnProfileDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class UsersListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = OtherUsersSerializer
    filter_backends = [SearchFilter]
    search_fields = ['username', 'first_name', 'last_name']
    
    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)


class OthersProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = OthersProfileSerailizer
    lookup_field = 'id'