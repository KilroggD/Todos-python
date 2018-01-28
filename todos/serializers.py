import hashlib
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Todo, User

class UserItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Class to serialize data for user profile details
    """
    email_hash = serializers.SerializerMethodField()
    topics = TopicSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'email_hash', 'first_name', 'last_name',
                  'current_position', 'bio', 'topics')

    def get_email_hash(self, obj):
        return hashlib.md5(obj.email.encode("UTF-8")).hexdigest()


class UserSerializer(serializers.ModelSerializer):
    """
    Class to serialize data for user validation
    """
    topics = serializers.PrimaryKeyRelatedField(
        required=False, many=True, queryset=Topic.objects.all())
    first_name = serializers.CharField(max_length=60)
    last_name = serializers.CharField(max_length=60)
    current_position = serializers.CharField(max_length=64)
    bio = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'current_position', 'bio', 'topics')

    def validate(self, data):
        if len(data['first_name']) + len(data['last_name']) > 60:
            raise serializers.ValidationError({
                'first_name': 'First + Last name should not exceed 60 chars'})
        return data


class UserRegistrationSerializer(serializers.Serializer):
    """
    Serializer for Registration - password match check
    """
    email = serializers.EmailField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField()
    confirm_password = serializers.CharField()

    def create(self, data):
        return User.objects.create_user(data['email'], data['password'])

    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError({
                'password': 'Please enter password and confirmation'})
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError(
                {'password': 'Passwords don\'t match'})
        return data

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('name', 'descr', 'completed', 'user')
