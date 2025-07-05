import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Meeting } from "@/store/slices/meetingSlice";
import { EditMeetingDialog } from "@/components/ui/EditMeetingDialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Props = {
  meeting: Meeting;
  onUpdate: (data: Partial<Meeting>) => void;
  onDelete: (id: string) => void;
};

export function MeetingCard({ meeting, onUpdate, onDelete }: Props) {
  return (
    <Card className="transition hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{meeting.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {new Date(meeting.date || "").toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{meeting.description}</p>
        <div className="flex gap-2">
          <EditMeetingDialog meeting={meeting} onSave={onUpdate} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <p>This action cannot be undone.</p>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(meeting._id!)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
