import { useState } from "react";
import { Loader2, CalendarClock, FileText, Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatISO } from "date-fns";

type Props = {
  initial?: { title?: string; description?: string; date?: string };
  onSubmit: (data: { title: string; description: string; date: string }) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

export function MeetingForm({
  initial = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: Props) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [date, setDate] = useState(initial.date || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const now = formatISO(new Date()).slice(0, 16); // YYYY-MM-DDTHH:mm

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (date < now) {
      setError("Please select a future date.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await onSubmit({ title, description, date });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
          <Type className="h-4 w-4 text-muted-foreground" />
          Title
        </Label>
        <Input
          id="title"
          placeholder="Enter meeting title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="transition focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="transition focus-visible:ring-2 focus-visible:ring-primary rounded-xl resize-none"
        />
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium">
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
          Date & Time
        </Label>
        <Input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={now}
          required
          className="transition focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
        {onCancel && (
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
