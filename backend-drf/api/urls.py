from django.urls import path
from rest_framework_simplejwt import views as JwtViews
from accounts import views as AccViews
from friendships import views as FrdShipsViews


urlpatterns = [
    #register
    path('register/', AccViews.RegistrationView.as_view(), name='user_registration'),
    
    #login
    path('token/', JwtViews.TokenObtainPairView.as_view(), name='obtain_token'),
    path('token/refresh/', JwtViews.TokenRefreshView.as_view(), name='refresh_token'),
    
    #Own Profile
    path('profile/me/', AccViews.OwnProfileView.as_view(), name='my_profile'),
    path('profile/me/edit/', AccViews.OwnProfileEditView.as_view(), name='my_profile_edit'),
    path('profile/me/delete/', AccViews.OwnProfileDeleteView.as_view(), name='my_profile_delete'),
]