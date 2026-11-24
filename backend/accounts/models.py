
from django.db import models
from django.contrib.auth.models import User


class ChildProfile(models.Model):
    parent = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="children"
    )

    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=20, blank=True)
    profile_photo = models.ImageField(
        upload_to="children/",
        blank=True,
        null=True
    )
    interests = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.parent.email}"


class ChildCharacterStyle(models.Model):
    STYLE_CHOICES = [
        ("chibi", "Chibi Style"),
        ("3d", "3D Cartoon"),
        ("storybook", "Storybook Illustration"),
    ]

    child = models.OneToOneField(
        ChildProfile,
        on_delete=models.CASCADE,
        related_name="character_style"
    )

    style = models.CharField(
        max_length=20,
        choices=STYLE_CHOICES,
        default="chibi"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.child.name} - {self.style}"


class Story(models.Model):

    CATEGORY_CHOICES = [
        ("Adventure", "Adventure"),
        ("Princess & Prince", "Princess & Prince"),
        ("Animal Friends", "Animal Friends"),
        ("Magic & Fairy Tales", "Magic & Fairy Tales"),
        ("Space Adventure", "Space Adventure"),
        ("Dinosaur World", "Dinosaur World"),
        ("Bedtime Story", "Bedtime Story"),
        ("Superhero Story", "Superhero Story"),
    ]

    LANGUAGE_CHOICES = [
        ("English", "English"),
        ("Hindi", "Hindi"),
        ("Marathi", "Marathi"),
    ]

    parent = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="stories"
    )

    child = models.ForeignKey(
        ChildProfile,
        on_delete=models.CASCADE,
        related_name="stories"
    )

    title = models.CharField(max_length=100)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    language = models.CharField(
        max_length=20,
        choices=LANGUAGE_CHOICES,
        default="English"
    )

    age_group = models.CharField(max_length=20)

    lesson = models.CharField(max_length=100, blank=True)

    description = models.TextField(max_length=1000)

    character_style = models.CharField(
        max_length=20,
        default="chibi"
    )

    story_content = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
