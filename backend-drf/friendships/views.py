from django.shortcuts import render
from .serializers import FriendRequestSerializer, ListRequestsSerializer, ListFriendsSerializer, FriendShipStatusSerializer
from .models import Friendship
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from accounts.models import User


class FriendRequestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        receiver = User.objects.get(id=id)
        serializer = FriendRequestSerializer(data=request.data, context={'request': request, 'receiver': receiver})
        if serializer.is_valid():
            serializer.save(sender=request.user, receiver=receiver)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListRequestsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListRequestsSerializer
    def get_queryset(self):
        return Friendship.objects.filter(receiver=self.request.user, status=Friendship.Status.PENDING).order_by('-created_at')


class RequestAcceptView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        try:
            friend_request = Friendship.objects.get(id=id, receiver=request.user)
        except Friendship.DoesNotExist:
            return Response({'errors': 'the request doesnt exist'}, status=status.HTTP_404_NOT_FOUND)
        
        if friend_request.status != Friendship.Status.PENDING:
            return Response({'errors': 'request already handled'}, status=status.HTTP_400_BAD_REQUEST)
        
        friend_request.status = Friendship.Status.ACCEPTED
        friend_request.save()
        
        return Response({'message': 'friend request accepted'}, status=status.HTTP_200_OK)


class RequestRejectView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        try:
            friend_request = Friendship.objects.get(id=id, receiver=request.user)
        except Friendship.DoesNotExist:
            return Response({'errors': 'the request doesnt exist'}, status=status.HTTP_404_NOT_FOUND)
        
        if friend_request.status != Friendship.Status.PENDING:
            return Response({'errors': 'request already handled'}, status=status.HTTP_400_BAD_REQUEST)
        
        friend_request.status = Friendship.Status.REJECTED
        friend_request.save()
        
        return Response({'message': 'friend request rejected'})


class ListFriendsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListFriendsSerializer
    def get_queryset(self):
        return Friendship.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user), status=Friendship.Status.ACCEPTED
            ).order_by('-created_at')
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class FriendShipStatusView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        try:
            other_user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'errors': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        
        friendship = Friendship.objects.filter(
            Q(sender=request.user, receiver=other_user) | Q(sender=other_user, receiver=request.user)
        ).first()
        
        if not friendship:
            return Response({'status': None}, status=status.HTTP_200_OK)
        
        serializer = FriendShipStatusSerializer(friendship)
        return Response(serializer.data, status=status.HTTP_200_OK)