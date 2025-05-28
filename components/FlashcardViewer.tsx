import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Flashcard } from "@/types";
import { LANGUAGES } from "@/constants";

interface FlashcardViewerProps {
  flashcards: Flashcard[];
  sourceLanguage: string;
  targetLanguage: string;
  onBack: () => void;
}

export default function FlashcardViewer({
  flashcards,
  sourceLanguage,
  targetLanguage,
  onBack,
}: FlashcardViewerProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const getLanguageName = (code: string) => {
    return LANGUAGES.find((lang) => lang.code === code)?.name || code;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Generator
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Your Generated Flashcards
          </h1>
          <p className="text-slate-600 text-lg">
            {getLanguageName(sourceLanguage)} →{" "}
            {getLanguageName(targetLanguage)} • {flashcards.length} cards
          </p>
        </div>

        {/* Flashcard Display */}
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <span className="text-sm text-slate-500 font-medium">
              Card {currentCardIndex + 1} of {flashcards.length}
            </span>
          </div>

          {/* Flashcard */}
          <div
            className="relative w-full max-w-lg h-80 mb-8 cursor-pointer perspective-1000"
            onClick={flipCard}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-3xl font-semibold text-slate-900 mb-6">
                    {currentCard?.front}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    Click to reveal translation
                  </div>
                </CardContent>
              </Card>

              {/* Back */}
              <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-3xl font-semibold text-green-600 mb-4">
                    {currentCard?.back}
                  </div>
                  {currentCard?.example && (
                    <div className="text-sm text-slate-600 italic max-w-md">
                      {currentCard.example}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              className="w-12 h-12 rounded-full border-slate-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              onClick={flipCard}
              className="px-6 border-slate-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Flip Card
            </Button>

            <Button
              variant="outline"
              onClick={nextCard}
              disabled={currentCardIndex === flashcards.length - 1}
              className="w-12 h-12 rounded-full border-slate-300"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="w-full max-w-lg">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentCardIndex + 1) / flashcards.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
