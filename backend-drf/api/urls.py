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
    
    #friendships
    #friend request
    path('friend/request/', FrdShipsViews.FriendRequestView.as_view(), name=''),
    #pending requests
    path('friend/requests/', FrdShipsViews.PendingRequestView.as_view(), name=''),
    #request response
    path('friend/response/<int:pk>/', FrdShipsViews.RespondFriendRequestView.as_view(), name=''),
    #friends list
    path('friend/list/', FrdShipsViews.FriendsListView.as_view(), name=''),
]