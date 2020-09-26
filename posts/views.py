from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Post
from .serializers import PostSerializer, PostCreateSerializer


def home(request):
    return render(request, 'index.html')


def post_detail(request, pk):
    return render(request, 'view.html')


class PostListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostCreateView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()


class PostDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostUpdateView(UpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostDeleteView(DestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
