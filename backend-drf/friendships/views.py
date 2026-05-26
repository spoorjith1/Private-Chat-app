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


class FriendRequestView():
    pass


class ListRequestsView():
    pass


class RequestAcceptView():
    pass


class RequestRejectView():
    pass


class ListFriendsView():
    pass


class FriendShipStatusView():
    pass