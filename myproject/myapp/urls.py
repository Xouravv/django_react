# urls.py

from django.urls import path, include
from .views import UserListCreateView, NoteListCreate, NoteListDelete, hello_world, hello_name
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .models import Note

urlpatterns = [
    path('', hello_world),
    path('<str:name>/', hello_name, name='hello_name'),
    path('api/register/', UserListCreateView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='verify_token'),
    path('api/notes/', NoteListCreate.as_view(), name='notes'),
    path('notes/delete/<int:pk>/', NoteListDelete.as_view(), name='delete_note'),
    path('api-auth/', include('rest_framework.urls')),
]
