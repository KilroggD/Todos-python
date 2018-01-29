from django.http import Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView, CreateAPIView
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from .serializers import (
    TodoSerializer,
    UserProfileSerializer,
    UserItemSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)
from .models import Todo, User

class TododList(APIView):
    """
    List of todos
    """
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        todos = Todo.objects().all()
        serializer = self.get_serializer(todos, many=True)
        return Response({'todos': serializer.data})
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoDetail(APIView):
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticated, )  

    def get_object(self, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        todo = self.get_object(pk)
        serializer = self.get_serializer(todo)
        return Response(serializer.data)
    def put(self, request, pk):
        todo = self.get_object(pk)
        serializer = self.get_serializer(todo, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        todo = self.get_object(pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserList(APIView):
    """
    List all users
    """
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserItemSerializer(users, many=True)
        return Response({'users': serializer.data})

class UserDetail(APIView):
    """
    User profile details
    """
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except Todo.DoesNotExist:
            raise Http404
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        if request.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = UserSerializer(user, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Registration(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.get_with_topics()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(UserProfileSerializer(user).data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)

    def perform_create(self, serializer):
        user = serializer.save(self.request)
        jwt_payload
        return user