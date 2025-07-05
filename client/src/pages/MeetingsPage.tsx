import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeetings } from "@/store/slices/meetingSlice";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { Meeting } from "@/store/slices/meetingSlice";
import api from "@/utils/axios";
import { EditMeetingDialog } from "@/components/ui/EditMeetingDialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { MeetingForm } from "@/components/ui/MeetingForm";

const MeetingsPage = () => {
  const dispatch = useAppDispatch();
  const { meetings, status, error } = useAppSelector((state) => state.meeting);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchMeetings());
  }, [dispatch]);

  const handleCreate = async (data: { title: string; description: string; date: string }) => {
    try {
      await api.post("/meetings", data);
      dispatch(fetchMeetings());
      toast({ title: "Meeting Added", description: "The meeting was successfully created!" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to add meeting.", variant: "destructive" });
    }
  };

  const handleUpdate = async (data: Partial<Meeting>) => {
    try {
      await api.put(`/meetings/${data._id}`, data);
      dispatch(fetchMeetings());
      toast({ title: "Meeting Updated", description: "Changes saved successfully." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to update meeting.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/meetings/${id}`);
      dispatch(fetchMeetings());
      toast({ title: "Meeting Deleted", description: "It was removed from the list." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete meeting.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Meeting</h2>
          <MeetingForm onSubmit={handleCreate} submitLabel="Add Meeting" />
        </div>

        <div>
          {status === "loading" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[160px] w-full rounded-xl" />
              ))}
            </div>
          )}

          {status === "failed" && <p className="text-red-500">{error}</p>}

          {status === "succeeded" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetings.map((meeting) => (
                <Card key={meeting._id} className="transition hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold">{meeting.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {new Date(meeting.date || "").toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">{meeting.description}</p>
                    <div className="flex gap-2">
                      <EditMeetingDialog meeting={meeting} onSave={handleUpdate} />

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
                            <AlertDialogAction onClick={() => handleDelete(meeting._id!)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MeetingsPage;
