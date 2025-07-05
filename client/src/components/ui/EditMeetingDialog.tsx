import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Meeting } from "@/store/slices/meetingSlice";
import { Edit } from "lucide-react";

type Props = {
  meeting: Meeting;
  onSave: (data: Partial<Meeting>) => void;
};

export function EditMeetingDialog({ meeting, onSave }: Props) {
  const [title, setTitle] = useState(meeting.title);
  const [description, setDescription] = useState(meeting.description || "");
  const [date, setDate] = useState(meeting.date?.slice(0, 16) || "");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="w-4 h-4" />
          <span className="sr-only">Edit Meeting</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Meeting</DialogTitle>
        </DialogHeader>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button
          onClick={() => onSave({ _id: meeting._id, title, description, date })}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
