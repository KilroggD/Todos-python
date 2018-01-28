from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse
from todos.models import User, Todo
# Create your tests here.

class ModelTestCase(TestCase):
    """Test suite for models"""

    def setUp(self):
        self.todo_name = 'Todo 1'
        self.todo = Todo(name=self.todo_name)

    def test_model_can_create_todo(self):
        """Model can create todo"""
        old_count = Todo.objects.count()
        self.todo.save()
        new_count = Todo.objects.count()
        self.assertNotEqual(old_count, new_count)
    
class ViewTestCase(TestCase):
    """Test suite for API views"""

    def setUp(self):
        self.client = APIClient()
        self.todo_data = {'name': 'todo1'}
        self.response = self.client.post(
            reverse('create'),
            self.todo_data,
            format='json'
        )

    def test_api_can_create_todo(self):
        """Api has creation capability"""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        
