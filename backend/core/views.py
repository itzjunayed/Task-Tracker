from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
import requests
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

class GoogleLogin(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        # DEBUG: Log what we receive
        logger.info(f"Request data: {request.data}")
        logger.info(f"Request body: {request.body}")
        logger.info(f"Content-Type: {request.content_type}")
        
        code = request.data.get('code')
        redirect_uri = request.data.get('redirect_uri')
        
        # DEBUG: Log parsed values
        logger.info(f"Parsed code: {code}")
        logger.info(f"Parsed redirect_uri: {redirect_uri}")
        
        if not code:
            return Response(
                {'error': 'Code is required', 'received_data': str(request.data)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not redirect_uri:
            return Response(
                {
                    'error': 'redirect_uri is required',
                    'received_data': str(request.data),
                    'content_type': request.content_type
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
        except requests.exceptions.RequestException as e:
            error_detail = token_response.json() if token_response else str(e)
            return Response(
                {
                    'error': 'Failed to exchange code', 
                    'details': error_detail
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        access_token = token_response.json().get('access_token')
        
        if not access_token:
            return Response(
                {'error': 'No access token received'}, 
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
        except requests.exceptions.RequestException as e:
            return Response(
                {'error': 'Failed to get user info', 'details': str(e)}, 
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