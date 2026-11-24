
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


class ParentLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True
    )

    def validate(self, data):
        email = data.get("email").lower().strip()
        password = data.get("password")

        try:
            user_obj = User.objects.get(
                email__iexact=email
            )
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        user = authenticate(
            username=user_obj.username,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "This account is inactive."
            )

        data["user"] = user
        return data
