from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Post

User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    # author = serializers.HyperlinkedIdentityField(many=False, view_name='owner-detail')

    # comments = serializers.HyperlinkedRelatedField(queryset=Comment.objects.all(), many=True,
    #                                                view_name='comment-detail')

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'publish_date', 'updated')
