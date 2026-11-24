
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import (
    ChildProfile,
    ChildCharacterStyle,
    Story,
)


class ParentRegisterSerializer(serializers.ModelSerializer):

    name = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "name",
            "email",
            "password",
            "confirm_password",
        ]

    def validate_email(self, value):
        email = value.lower().strip()

        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return email

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match."
            })

        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        name = validated_data.pop("name")
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name
        )

        return user


class ChildProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChildProfile
        fields = [
            "id",
            "name",
            "age",
            "gender",
            "profile_photo",
            "interests",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_age(self, value):
        if value < 1 or value > 18:
            raise serializers.ValidationError(
                "Child age must be between 1 and 18."
            )

        return value


class ChildCharacterStyleSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChildCharacterStyle

        fields = [
            "id",
            "child",
            "style",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "child",
            "created_at",
            "updated_at",
        ]

    def validate_style(self, value):

        allowed_styles = [
            "chibi",
            "3d",
            "storybook",
        ]

        if value not in allowed_styles:
            raise serializers.ValidationError(
                "Invalid character style."
            )

        return value
class StorySerializer(serializers.ModelSerializer):

    child_name = serializers.CharField(
        source="child.name",
        read_only=True
    )
    class Meta:
        model = Story

        fields = [
            "id",
            "child",
            "child_name",
            "title",
            "category",
            "language",
            "age_group",
            "lesson",
            "description",
            "character_style",
            "story_content",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "child_name",
            "story_content",
            "created_at",
            "updated_at",
        ]

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Story title is required."
            )

        return value.strip()

    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Story description is required."
            )

        return value.strip()
