import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center p-4 my-4 rounded-md bg-red-50 border border-red-200 text-red-800">
      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
