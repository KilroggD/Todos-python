from django.conf.urls import url
from todos import views

urlpatterns = [
     url(r'^current_user/$', views.CurrentUser.as_view()),
     url(r'^register/$', views.Registration.as_view()),
     url(r'^users/$', views.UserList.as_view()),     
     url(r'^user/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
     url(r'^search/$', views.UserSearch.as_view()),
     url(r'^todos/$', views.TodosList.as_view()),
     url(r'^todo/(?P<pk>[0-9]+)/$', views.TodoDetail.as_view()),
]
