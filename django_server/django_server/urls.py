"""
URL configuration for django_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from echo.views import *
from blogs.views import *
from django.http import JsonResponse 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('echo/recommend/<problem_id>', recommend),
    path('echo/ratings/cf/<handle_name>', rating),
    path('echo/ratings/lc/<handle_name>', predict_my_rating),
    path('echo/recommendFromText', recommendFromText),
    path('echo/tags', tagsPredictor),
    path('echo/test', test),
    path('', lambda request: JsonResponse({'message': 'Server Is Running'}))
]
