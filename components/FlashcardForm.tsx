import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BookOpen, Sparkles } from "lucide-react";
import { LANGUAGES, CONTENT_FOCUS } from "@/constants";
import { FlashcardGenerationParams } from "@/types";

interface FlashcardFormProps {
  onGenerateFlashcards: (params: FlashcardGenerationParams) => void;
  isGenerating: boolean;
}

export default function FlashcardForm({
  onGenerateFlashcards,
  isGenerating,
}: FlashcardFormProps) {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [cardCount, setCardCount] = useState([10]);
  const [focus, setFocus] = useState("vocabulary");

  const handleSubmit = () => {
    onGenerateFlashcards({
      inputText,
      sourceLanguage,
      targetLanguage,
      cardCount: cardCount[0],
      focus,
    });
  };

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-6 h-6 text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Create Your Flashcards
          </h2>
        </div>

        <div className="space-y-8">
          {/* Input Text */}
          <div>
            <Label
              htmlFor="input-text"
              className="text-base font-medium text-slate-700 mb-3 block"
            >
              Topic, Words, or Text
            </Label>
            <Textarea
              id="input-text"
              placeholder="Enter a topic (e.g., 'travel vocabulary'), list of words, or a paragraph of text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] resize-none border-slate-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* Language Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-base font-medium text-slate-700 mb-3 block">
                Source Language
              </Label>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium text-slate-700 mb-3 block">
                Target Language
              </Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Number of Cards */}
          <div>
            <Label className="text-base font-medium text-slate-700 mb-4 block">
              Number of Flashcards: {cardCount[0]}
            </Label>
            <Slider
              value={cardCount}
              onValueChange={setCardCount}
              max={20}
              min={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>5</span>
              <span>20</span>
            </div>
          </div>

          {/* Content Focus */}
          <div>
            <Label className="text-base font-medium text-slate-700 mb-3 block">
              Content Focus
            </Label>
            <Select value={focus} onValueChange={setFocus}>
              <SelectTrigger className="border-slate-300 focus:border-green-500 focus:ring-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_FOCUS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleSubmit}
            disabled={!inputText.trim() || isGenerating}
            className="w-full h-12 text-lg font-semibold bg-slate-900 hover:bg-slate-800 text-white"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Generating Flashcards...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Flashcards
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
