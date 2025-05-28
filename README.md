# Multilingual Flashcard Generator

This application allows users to generate multilingual flashcards using OpenAI and Vercel AI SDK. It's built with Next.js and uses the shadcn/ui component library.

## Features

- Create flashcards for learning vocabulary in different languages
- Powered by OpenAI GPT models for accurate translations
- Interactive flashcard interface with flip animations
- Customizable number of cards and content focus

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app router files
  - `api/` - Backend API routes
  - `page.tsx` - Main application page
- `components/` - React components
  - `FlashcardForm.tsx` - Form for generating flashcards
  - `FlashcardViewer.tsx` - Flashcard display and navigation
  - `ExamplePreview.tsx` - Example flashcard preview
- `utils/` - Utility functions
- `types/` - TypeScript type definitions
- `constants/` - Application constants

## Dependencies

- Next.js
- React
- OpenAI API
- Vercel AI SDK
- shadcn/ui
- Lucide React (icons)
- Tailwind CSS

## License

MIT
