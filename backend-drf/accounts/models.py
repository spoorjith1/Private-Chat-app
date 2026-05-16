from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True, default='profile_pics/default.png')
    email = models.EmailField(unique=True, blank=False, null=False)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return f"{self.id} | {self.username}"