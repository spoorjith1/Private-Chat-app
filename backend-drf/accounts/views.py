from django.shortcuts import render
from .models import User
from .serializers import UserRegistrationSerializer, OwnProfileViewSerializer, OwnProfileSerializer, UserSearchSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q


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
    serializer_class = OwnProfileSerializer
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


class UserSearchView(generics.ListAPIView):
    serializer_class = UserSearchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        search = self.request.query_params.get('search', '')
        queryset = User.objects.exclude(id=self.request.user.id)
        
        if search:
            queryset = queryset.filter(username__icontains=search)
        return queryset