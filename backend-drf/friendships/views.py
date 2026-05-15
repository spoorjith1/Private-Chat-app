from django.shortcuts import render
from .serializers import SendFriendRequestSerializer, FriendshipSerializer, RespondFriendRequestSerializer
from rest_framework import generics
from .models import Friendship
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


class FriendRequestView(generics.CreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = SendFriendRequestSerializer
    permission_classes = [IsAuthenticated]


class PendingRequestView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendshipSerializer
    
    def get_queryset(self):
        return Friendship.objects.filter(receiver=self.request.user, status=Friendship.Status.PENDING)


class RespondFriendRequestView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RespondFriendRequestSerializer
    queryset = Friendship.objects.all()

    def get_queryset(self):
        return Friendship.objects.filter(receiver=self.request.user, status=Friendship.Status.PENDING)


class FriendsListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendshipSerializer
    
    def get_queryset(self):
        return Friendship.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user),
            status=Friendship.Status.ACCEPTED
        )