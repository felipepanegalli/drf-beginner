from django.contrib import admin
from django.urls import path, include

from posts.views import PostView, post_list, post_detail, PostMixinListView, PostListView, PostDetailView, \
    PostDeleteView, OwnerDetailView, CommentDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/owner/<pk>/', OwnerDetailView.as_view(), name='owner-detail'),
    path('api/comment/<pk>/', CommentDetailView.as_view(), name='comment-detail'),
    path('api/', include('posts.urls')),

    # path('api/posts/', PostListView.as_view(), name='post-list'),
    # path('api/posts/<pk>/', PostDetailView.as_view(), name='post-detail'),
    # path('api/posts/<pk>/', PostDeleteView.as_view(), name='post-delete'),

    # path('api/posts/', PostMixinListView.as_view(), name='post-list'),

    # path('api/posts/<pk>/', PostView.as_view(), name='post-list'),
    # path('api/posts/', post_list, name='post-list'),
    # path('api/posts/<int:pk>/', post_detail, name='post-detail'),
]
