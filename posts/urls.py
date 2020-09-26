from django.urls import path

from posts.views import PostListView, PostCreateView, PostDetailView, PostUpdateView, PostDeleteView

urlpatterns = [
    path('', PostListView.as_view(), name='post-list'),
    path('create/', PostCreateView.as_view(), name='post-create'),
    path('<pk>/', PostDetailView.as_view(), name='post-detail'),
    path('<pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('<pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
]
