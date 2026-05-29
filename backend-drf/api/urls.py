from django.urls import path
from rest_framework_simplejwt import views as JwtViews
from accounts import views as AccViews
from friendships import views as FrdShipsViews
from chat import views as ChatViews


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
    
    #Other Users
    path('users/', AccViews.UsersListView.as_view(), name='users_list'),
    path('user/<int:id>/', AccViews.OthersProfileView.as_view(), name='others_profile'),
    
    #Friends ships
    path('friend/status/<int:id>/', FrdShipsViews.FriendShipStatusView.as_view(), name='friends_status'),
    path('friend/request/<int:id>/', FrdShipsViews.FriendRequestView.as_view(), name='friend_request'),
    path('friends/requests/', FrdShipsViews.ListRequestsView.as_view(), name='list_requests'),
    path('friend/request/accept/<int:id>/', FrdShipsViews.RequestAcceptView.as_view(), name='accept_request'),
    path('friend/request/reject/<int:id>/', FrdShipsViews.RequestRejectView.as_view(), name='reject_request'),
    path('friends/list/', FrdShipsViews.ListFriendsView.as_view(), name='list_friends'),
    
    #Chat - conversation & message
    path('chats/', ChatViews.ConversationListView.as_view(), name='all_chats'),
    path('chat/', ChatViews.CreateConversationView.as_view(), name='user_chat'),
    path('messages/<int:pk>/', ChatViews.MessageListView.as_view(), name='all_messages'),
    path('message/<int:pk>/', ChatViews.SendMessageView.as_view(), name='new_message'),
    path('chat/details/<int:pk>/', ChatViews.ConversationDetailView.as_view(), name='chat_user'),
]