import { Flashcard, FlashcardGenerationParams } from "@/types";

export async function generateFlashcards(
  params: FlashcardGenerationParams
): Promise<Flashcard[]> {
  try {
    const response = await fetch("/api/generate-flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Error: ${response.status}`);
    }

    const data = await response.json();

    // Check if the response is an array of flashcards directly
    if (Array.isArray(data)) {
      return data;
    }

    // Check if the response contains a flashcards array
    if (data.flashcards && Array.isArray(data.flashcards)) {
      return data.flashcards;
    }

    // If we get a different structure, try to find an array
    const possibleArrays = Object.values(data).filter(
      (value) =>
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === "object" &&
        "front" in value[0] &&
        "back" in value[0]
    );

    if (possibleArrays.length > 0) {
      return possibleArrays[0] as Flashcard[];
    }

    console.error("Unexpected response format:", data);
    return [];
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw error;
  }
}
