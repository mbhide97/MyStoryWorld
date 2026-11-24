
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ParentRegisterView,
    ParentLoginView,
    ParentProfileView,
    ChildProfileListCreateView,
    ChildProfileDetailView,
    ChildCharacterStyleView,
    StoryListCreateView,
    StoryDetailView,
    GenerateStoryView,
)

urlpatterns = [
    # Parent APIs
    path("register/", ParentRegisterView.as_view(), name="parent-register"),
    path("login/", ParentLoginView.as_view(), name="parent-login"),
    path("profile/", ParentProfileView.as_view(), name="parent-profile"),

    # JWT Token Refresh API
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),

    # Child Profile APIs
    path("children/", ChildProfileListCreateView.as_view(), name="child-list-create"),
    path("children/<int:pk>/", ChildProfileDetailView.as_view(), name="child-detail"),

    # Child Character Style API
    path(
        "children/<int:child_id>/character-style/",
        ChildCharacterStyleView.as_view(),
        name="child-character-style"
    ),

    # Story APIs
    path("stories/", StoryListCreateView.as_view(), name="story-list-create"),

    # Story Detail and Delete API
    path(
        "stories/<int:pk>/",
        StoryDetailView.as_view(),
        name="story-detail"
    ),

    # Gemini AI Story Generation API
    path(
        "stories/<int:pk>/generate/",
        GenerateStoryView.as_view(),
        name="generate-ai-story"
    ),
]
