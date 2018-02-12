"""tutorial URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import cache_control

urlpatterns = [
    url(r'^$', csrf_exempt(TemplateView.as_view(template_name='index.html'))),
    url(
        r'^service-worker.js', cache_control(max_age=2592000)(
            TemplateView.as_view(
                template_name="service-worker.js",
                content_type='application/javascript',
            )
        ),
        name='service-worker.js'
    ),
    url(r'^api/', include('todos.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^(?P<path>.*)/$', csrf_exempt(TemplateView.as_view(template_name='index.html'))),
]
