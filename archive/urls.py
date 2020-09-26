from django.urls import include, path
from rest_framework.routers import DefaultRouter

from archive.views import PostViewSet

router = DefaultRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls))
]
