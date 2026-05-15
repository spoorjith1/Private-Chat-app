from rest_framework import serializers
from .models import Friendship
from accounts.models import User


class SendFriendRequestSerializer(serializers.ModelSerializer):
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Friendship
        fields = ['receiver']
        
    def validate(self, attrs):
        sender = self.context['request'].user
        receiver = attrs['receiver']
        
        if sender == receiver:
            raise serializers.ValidationError("You cannot send request to yourself")
        
        if Friendship.objects.filter(sender=sender, receiver=receiver).exists():
            raise serializers.ValidationError("request already sent")
        
        if Friendship.objects.filter(sender=receiver, receiver=sender).exists():
            raise serializers.ValidationError("This user already sent you a request")
        
        return attrs
    
    def create(self, validated_data):
        sender = self.context['request'].user
        
        friendship = Friendship.objects.create(sender=sender, receiver=validated_data['receiver'])
        return friendship


class FriendshipSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    profile_pic = serializers.SerializerMethodField()
    
    class Meta:
        model = Friendship
        fields = ['id', 'user_id', 'username', 'profile_pic', 'status', 'created_at']
        
    def get_user_id(self, obj):
        request_user = self.context['request'].user
        if obj.sender == request_user:
            return obj.receiver.id
        return obj.sender.id
    
    def get_username(self, obj):
        request_user = self.context['request'].user
        if obj.sender == request_user:
            return obj.receiver.username
        return obj.sender.username
    
    def get_profile_pic(self, obj):
        request_user = self.context['request'].user
        if obj.sender == request_user:
            if obj.receiver.profile_pic:
                return obj.receiver.profile_pic.url
            return None
        if obj.sender.profile_pic:
            return obj.sender.profile_pic.url
        return None


class RespondFriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ['status']

    def validate_status(self, value):
        if value not in ['accepted', 'rejected']:
            raise serializers.ValidationError("Status must be accepted or rejected.")
        return value

    def update(self, instance, validated_data):
        request_user = self.context['request'].user

        if instance.receiver != request_user:
            raise serializers.ValidationError("You cannot respond to this request.")

        if instance.status != Friendship.Status.PENDING:
            raise serializers.ValidationError("This request has already been handled.")

        instance.status = validated_data['status']
        instance.save()

        return instance