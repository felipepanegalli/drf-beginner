from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class PostCategory(models.TextChoices):
    DJ = "DJ", "Django"
    RBY = "RBY", "Ruby"
    PHP = "PHP", "PHP"


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    custom_id = models.IntegerField()
    category = models.CharField(max_length=3, choices=PostCategory.choices, default=PostCategory.DJ)
    comments = models.ManyToManyField('Comment')
    publish_date = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title