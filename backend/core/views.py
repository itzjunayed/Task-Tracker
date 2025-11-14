from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
import requests

User = get_user_model()

class GoogleLogin(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        code = request.data.get('code')
        redirect_uri = request.data.get('redirect_uri')
        
        if not code:
            return Response(
                {'error': 'Code is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not redirect_uri:
            return Response(
                {
                    'error': 'redirect_uri is required',
                    'hint': 'Make sure frontend sends redirect_uri in request body'
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Exchange code for access token
        token_url = 'https://oauth2.googleapis.com/token'
        token_data = {
            'code': code,
            'client_id': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['client_id'],
            'client_secret': settings.SOCIALACCOUNT_PROVIDERS['google']['APP']['secret'],
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code',
        }
        
        try:
            token_response = requests.post(token_url, data=token_data)
            token_response.raise_for_status()
        except requests.exceptions.RequestException:
            error_detail = token_response.json() if token_response.content else 'Unknown error'
            return Response(
                {
                    'error': 'Failed to exchange code with Google', 
                    'details': error_detail
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        token_json = token_response.json()
        access_token = token_json.get('access_token')
        
        if not access_token:
            return Response(
                {'error': 'No access token received from Google'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get user info from Google
        user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
        try:
            user_info_response = requests.get(
                user_info_url,
                headers={'Authorization': f'Bearer {access_token}'}
            )
            user_info_response.raise_for_status()
        except requests.exceptions.RequestException:
            return Response(
                {'error': 'Failed to get user info from Google'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_info = user_info_response.json()
        email = user_info.get('email')
        
        if not email:
            return Response(
                {'error': 'Email not provided by Google'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email,
                'first_name': user_info.get('given_name', ''),
                'last_name': user_info.get('family_name', ''),
            }
        )
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': {
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        })