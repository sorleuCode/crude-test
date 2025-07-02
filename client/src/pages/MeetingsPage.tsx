import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMeetings } from "@/store/slices/meetingSlice";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import type { Meeting } from "@/store/slices/meetingSlice";
import api from "@/utils/axios";


const MeetingsPage = () => {
  const dispatch = useAppDispatch();
  const { meetings, status, error } = useAppSelector((state) => state.meeting);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMeetings());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(
          `/meetings/${editingId}`,
          { title, description, date },
        );
        setEditingId(null);
      } else {
        await api.post(
          "/meetings",
          { title, description, date },
        );
      }
      dispatch(fetchMeetings());
      setTitle("");
      setDescription("");
      setDate("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/meetings/${id}`, {
      });
      dispatch(fetchMeetings());
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (meeting: any) => {
    setEditingId(meeting._id);
    setTitle(meeting.title);
    setDescription(meeting.description || "");
    setDate(meeting.date?.slice(0, 16) || "");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Meeting" : "Add Meeting"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <Button type="submit">{editingId ? "Update" : "Add"} Meeting</Button>
          {editingId && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setDescription("");
                setDate("");
              }}
            >
              Cancel
            </Button>
          )}
        </form>

        {status === "loading" && <p>Loading meetings...</p>}
        {status === "failed" && <p className="text-red-500">{error}</p>}

        <ul className="space-y-3">
          {meetings?.map((meeting: Meeting) => (
            <li
              key={meeting._id}
              className="p-4 border rounded bg-white dark:bg-zinc-800"
            >
              <h3 className="font-semibold text-lg">{meeting.title}</h3>
              <p>{meeting.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(meeting.date || "").toLocaleString()}
              </p>
              <div className="mt-2 space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(meeting)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(meeting._id!)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default MeetingsPage;
