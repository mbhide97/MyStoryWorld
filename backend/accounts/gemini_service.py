
from django.conf import settings
from google import genai


def generate_ai_story(story):
    """
    Generate a personalized children's story using Gemini AI.
    """

    api_key = settings.GEMINI_API_KEY

    if not api_key:
        raise ValueError("Gemini API key is not configured.")

    child = story.child

    prompt = f"""
    You are a creative children's story writer.

    Create an original, engaging and child-friendly story.

    Story details:
    Child name: {child.name}
    Child age: {child.age}
    Child gender: {child.gender or "Not specified"}
    Child interests: {child.interests or "General interests"}
    Story title: {story.title}
    Category: {story.category}
    Language: {story.language}
    Age group: {story.age_group}
    Moral lesson: {story.lesson or "Friendship and kindness"}
    Story description: {story.description}
    Character style: {story.character_style}

    Requirements:
    1. Write the complete story in {story.language}.
    2. Make the child the main character.
    3. Create 16 short, connected story pages.
    4. Give each page a heading: PAGE 1, PAGE 2, etc.
    5. Use simple vocabulary suitable for the child's age.
    6. Include an interesting beginning, adventure and happy ending.
    7. Include the moral lesson naturally.
    8. Do not include harmful, frightening or inappropriate content.
    9. Return only the story text.
    """

    client = genai.Client(api_key=api_key)

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt
        )

        generated_text = response.text

        if not generated_text or not generated_text.strip():
            raise ValueError("Gemini returned an empty story.")

        return generated_text.strip()

    finally:
        client.close()
