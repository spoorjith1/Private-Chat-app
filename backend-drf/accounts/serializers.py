from rest_framework import serializers
from .models import User
from django.db.models import Q
from friendships.models import Friendship


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        
    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("email already exists")
        return value
    
    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("username already exists")
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class OwnProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'profile_pic', 'username', 'first_name', 'last_name', 'email', 'mobile_number', 'date_of_birth']
        
    def validate_email(self, value):
        user = self.instance
        
        if user and User.objects.filter(email__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def validate_username(self, value):
        user = self.instance
        
        if user and User.objects.filter(username__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("Username already exists")
        return value


class OwnProfileViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'profile_pic', 'username', 'first_name', 'last_name', 'email', 'mobile_number', 'date_of_birth']


class UserSearchSerializer(serializers.ModelSerializer):
    friendship_status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'profile_pic',
            'friendship_status'
        ]

    def get_friendship_status(self, obj):

        request_user = self.context['request'].user

        friendship = Friendship.objects.filter(
            Q(sender=request_user, receiver=obj) |
            Q(sender=obj, receiver=request_user)
        ).first()

        if not friendship:
            return None

        return friendship.status