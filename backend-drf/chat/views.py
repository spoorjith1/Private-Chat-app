from django.shortcuts import render
from .serializers import ConversationSerializer, CreateConversationSerializer, MessageSerializer, SendMessageSerializer
from .models import Conversation, Message
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.db.models import Q
from rest_framework.response import Response


class ConversationListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationSerializer
    def get_queryset(self):
        return Conversation.objects.filter(users=self.request.user).order_by('-updated_at')


class CreateConversationView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateConversationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        conversation = serializer.save()
        return Response({"id": conversation.id})


class MessageListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer
    def get_queryset(self):
        conversation = Conversation.objects.filter(id=self.kwargs['pk'], users=self.request.user).first()
        if not conversation:
            return Message.objects.none()
        return Message.objects.filter(conversation=conversation)


class SendMessageView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SendMessageSerializer
    def get_serializer_context(self):
        context = super().get_serializer_context()
        conversation = Conversation.objects.filter(id=self.kwargs['pk'], users=self.request.user).first()
        context['conversation'] = conversation
        return context


class ConversationDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationSerializer

    def get_object(self):
        return Conversation.objects.filter(id=self.kwargs['pk'], users=self.request.user).first()