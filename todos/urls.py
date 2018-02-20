from django.conf.urls import url
from todos import views

urlpatterns = [
     url(r'^current_user/$', views.CurrentUser.as_view()),
     url(r'^sign_up/$', views.Registration.as_view()),
]
