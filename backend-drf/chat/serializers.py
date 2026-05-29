from rest_framework import serializers
from .models import Conversation, Message
from accounts.models import User
from friendships.models import Friendship
from django.utils import timezone



class ConversationSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    profile_pic = serializers.SerializerMethodField()
    class Meta:
        model = Conversation
        fields = ['id', 'user_id', 'username', 'profile_pic', 'updated_at']
    
    def get_other_user(self, obj):
        request_user = self.context['request'].user
        return obj.users.exclude(id=request_user.id).first()
    
    def get_user_id(self, obj):
        other_user = self.get_other_user(obj)
        return other_user.id
    
    def get_username(self, obj):
        other_user = self.get_other_user(obj)
        return other_user.username
    
    def get_profile_pic(self, obj):
        other_user = self.get_other_user(obj)
        if other_user.profile_pic:
            return other_user.profile_pic.url
        return None
        


class CreateConversationSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Conversation
        fields = ['user_id']
        
    def validate_user_id(self, value):
        request_user = self.context['request'].user
        
        if request_user.id == value:
            raise serializers.ValidationError('You cannot chat with yourself')
        
        other_user = User.objects.filter(id=value).first()
        if not other_user:
            raise serializers.ValidationError("User does not exist")
        
        friendship_exists = Friendship.objects.filter(status=Friendship.Status.ACCEPTED).filter(
            sender=request_user, receiver=other_user
        ).exists() or Friendship.objects.filter(status=Friendship.Status.ACCEPTED).filter(
            sender=other_user, receiver=request_user
        ).exists()
        
        if not friendship_exists:
            raise serializers.ValidationError("You are not friends with this user")
        return value
    
    def create(self, validated_data):
        request_user = self.context['request'].user
        other_user = User.objects.get(id=validated_data['user_id'])
        
        conversation = Conversation.objects.filter(users=request_user).filter(users=other_user).first()
        
        if conversation:
            return conversation
        
        conversation = Conversation.objects.create()
        conversation.users.add(request_user, other_user)
        return conversation
        


class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_username', 'message', 'created_at', 'is_read']



class SendMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['message']
        
    def create(self, validated_data):
        conversation = self.context['conversation']
        sender = self.context['request'].user
        
        message = Message.objects.create(conversation=conversation, sender=sender, message=validated_data['message'])
        
        conversation.updated_at = timezone.now()
        conversation.save()
        
        return message