from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .gemini_service import generate_ai_story
from .serializers import (
    ParentRegisterSerializer,
    ChildProfileSerializer,
    ChildCharacterStyleSerializer,
    StorySerializer,
)
from .login_serializers import ParentLoginSerializer
from .models import (
    ChildProfile,
    ChildCharacterStyle,
    Story,
)


# PARENT REGISTRATION API
class ParentRegisterView(generics.CreateAPIView):

    serializer_class = ParentRegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "Parent registered successfully!",
                    "user": {
                        "id": user.id,
                        "name": user.first_name,
                        "email": user.email
                    }
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# PARENT LOGIN API
class ParentLoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = ParentLoginSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "message": "Login successful!",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": {
                        "id": user.id,
                        "name": user.first_name,
                        "email": user.email
                    }
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# PARENT PROFILE API
class ParentProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response(
            {
                "message": "Profile fetched successfully!",
                "user": {
                    "id": user.id,
                    "name": user.first_name,
                    "email": user.email
                }
            },
            status=status.HTTP_200_OK
        )

    def put(self, request):

        user = request.user

        name = request.data.get("name", "").strip()
        email = request.data.get("email", "").strip().lower()

        if not name or not email:
            return Response(
                {"message": "Name and email are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(name) < 2:
            return Response(
                {"message": "Name must contain at least 2 characters."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(
            email__iexact=email
        ).exclude(id=user.id).exists():

            return Response(
                {"message": "This email is already registered."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.exclude(id=user.id).filter(
            username__iexact=email
        ).exists():

            return Response(
                {
                    "message": "This email is already used by another account."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.first_name = name
        user.email = email
        user.username = email
        user.save()

        return Response(
            {
                "message": "Profile updated successfully!",
                "user": {
                    "id": user.id,
                    "name": user.first_name,
                    "email": user.email
                }
            },
            status=status.HTTP_200_OK
        )


# CHILD PROFILE LIST AND CREATE API
class ChildProfileListCreateView(generics.ListCreateAPIView):

    serializer_class = ChildProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChildProfile.objects.filter(
            parent=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(parent=self.request.user)


# CHILD PROFILE UPDATE AND DELETE API
class ChildProfileDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ChildProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChildProfile.objects.filter(
            parent=self.request.user
        )


# CHILD CHARACTER STYLE API
class ChildCharacterStyleView(generics.GenericAPIView):

    serializer_class = ChildCharacterStyleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChildCharacterStyle.objects.filter(
            child__parent=self.request.user
        )

    def get(self, request, child_id):

        style = self.get_queryset().filter(
            child_id=child_id
        ).first()

        if not style:
            return Response(
                {"message": "Character style not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(style)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, child_id):

        child = get_object_or_404(
            ChildProfile,
            id=child_id,
            parent=request.user
        )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        style_obj, created = ChildCharacterStyle.objects.update_or_create(
            child=child,
            defaults={
                "style": serializer.validated_data["style"]
            }
        )

        response_serializer = self.get_serializer(style_obj)

        return Response(
            response_serializer.data,
            status=(
                status.HTTP_201_CREATED
                if created
                else status.HTTP_200_OK
            )
        )


# STORY LIST AND CREATE API
class StoryListCreateView(generics.ListCreateAPIView):

    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Story.objects.filter(
            parent=self.request.user
        ).select_related("child").order_by("-created_at")

    def perform_create(self, serializer):

        child_id = self.request.data.get("child")

        if not child_id:
            from rest_framework.exceptions import ValidationError
            raise ValidationError({
                "child": "Please select a child profile."
            })

        child = get_object_or_404(
            ChildProfile,
            id=child_id,
            parent=self.request.user
        )

        serializer.save(
            parent=self.request.user,
            child=child
        )


# STORY DETAIL AND DELETE API
class StoryDetailView(generics.RetrieveDestroyAPIView):

    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Story.objects.filter(
            parent=self.request.user
        )


# GEMINI AI STORY GENERATION API
class GenerateStoryView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        story = get_object_or_404(
            Story,
            id=pk,
            parent=request.user
        )

        try:
            generated_content = generate_ai_story(story)

            story.story_content = generated_content
            story.save(
                update_fields=["story_content", "updated_at"]
            )

            serializer = StorySerializer(story)

            return Response(
                {
                    "message": "AI story generated successfully.",
                    "story": serializer.data
                },
                status=status.HTTP_200_OK
            )

        except Exception as error:
            return Response(
                {
                    "message": "AI story generation failed.",
                    "error": str(error)
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
