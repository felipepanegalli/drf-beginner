from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post

User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    # comments = serializers.HyperlinkedRelatedField(queryset=Comment.objects.all(), many=True,
    #                                                view_name='comment-detail')

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'publish_date', 'updated')

    def get_author(self, obj):
        return obj.author.user.username


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'content', 'author')
