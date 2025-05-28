"use client";

import ErrorMessage from "@/components/ErrorMessage";
import FlashcardForm from "@/components/FlashcardForm";
import FlashcardViewer from "@/components/FlashcardViewer";
import { Flashcard, FlashcardGenerationParams } from "@/types";
import { generateFlashcards } from "@/utils/flashcardGenerator";
import { useState } from "react";

export default function FlashcardApp() {
  const [currentView, setCurrentView] = useState<"generator" | "flashcards">(
    "generator"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFlashcards = async (
    params: FlashcardGenerationParams
  ) => {
    setIsGenerating(true);
    setError(null);
    setSourceLanguage(params.sourceLanguage);
    setTargetLanguage(params.targetLanguage);

    try {
      const generatedFlashcards = await generateFlashcards(params);
      setFlashcards(generatedFlashcards);
      setCurrentView("flashcards");
    } catch (error) {
      console.error("Failed to generate flashcards:", error);
      setError(
        "Failed to generate flashcards. Please try again or check your API key."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToGenerator = () => {
    setCurrentView("generator");
    setError(null);
  };

  if (currentView === "flashcards") {
    return (
      <FlashcardViewer
        flashcards={flashcards}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onBack={handleBackToGenerator}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Multilingual Flashcard Generator
          </h1>
          <p className="text-xl text-slate-600">
            Generate multilingual flashcards with AI-powered translations using
            SUTRA
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="grid gap-8">
          {/* Generator Form */}
          <div className="">
            <FlashcardForm
              onGenerateFlashcards={handleGenerateFlashcards}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
