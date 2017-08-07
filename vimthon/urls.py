from django.conf.urls import include, url
from . import views

urlpatterns = [
	url(r'^$', views.main, name='main'),
        url(r'^cursor$', views.set_cursor, name='set_cursor')
]
