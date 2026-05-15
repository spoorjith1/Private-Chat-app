from django.urls import path
from rest_framework_simplejwt import views as JwtViews
from accounts import views as AccViews

urlpatterns = [
    #register
    path('register/', AccViews.RegistrationView.as_view(), name='user_registration'),
    
    #login
    path('token/', JwtViews.TokenObtainPairView.as_view(), name='obtain_token'),
    path('token/refresh', JwtViews.TokenRefreshView.as_view(), name='refresh_token'),
]