from django.http import Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from .serializers import (
    TodoSerializer,
    UserProfileSerializer,
    UserItemSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)
from .models import Todo, User


def index(request):
    return render(request, 'index.html')


class TodosList(generics.GenericAPIView):
    """
    List of todos
    """
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        todos = Todo.objects().filter(user=request.data.user_id)
        serializer = self.get_serializer(todos, many=True)
        return Response({'todos': serializer.data})

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetail(generics.GenericAPIView):
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


class UserSearch(APIView):
    """
    Advanced user search
    """

    def post(self, request):
        if request.data:
            users = User.objects.search(request.data)
        else:
            users = User.objects.all()
        serializer = UserSerializer(users, many=True)
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


class CurrentUser(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.id == None:
            raise Http404
        serializer = UserProfileSerializer(request.user)
        data = serializer.data
        data['is_admin'] = request.user.is_superuser
        return Response(data)


class Registration(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer, request.data)

        return Response({}, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer, data):
        user = serializer.create(data)
        return user
