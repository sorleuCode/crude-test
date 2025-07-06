import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/utils/axios';

export interface Meeting {
  _id: string;
  title: string;
  description: string;
  date: string;
}

interface MeetingState {
  meetings: Meeting[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
}

const initialState: MeetingState = {
  meetings: [],
  status: 'idle',
  error: '',
};

//  Fetch all meetings
export const fetchMeetings = createAsyncThunk(
  'meetings/fetchMeetings',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/meetings');
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to fetch meetings');
    }
  }
);

// Create a new meeting
export const createMeeting = createAsyncThunk(
  'meetings/createMeeting',
  async (newMeeting: Omit<Meeting, '_id'>, thunkAPI) => {
    try {
      const res = await api.post('/meetings', newMeeting);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to create meeting');
    }
  }
);

// Update an existing meeting
export const updateMeeting = createAsyncThunk(
  'meetings/updateMeeting',
  async ({ id, updatedData }: { id: string; updatedData: Partial<Meeting> }, thunkAPI) => {
    try {
      const res = await api.put(`/meetings/${id}`, updatedData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to update meeting');
    }
  }
);

export const deleteMeeting = createAsyncThunk(
  'meetings/deleteMeeting',
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/meetings/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to delete meeting');
    }
  }
);

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeetings.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.status = 'succeeded';
        state.meetings = action.payload;
        state.error = '';
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Create
    builder
      .addCase(createMeeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMeeting.fulfilled, (state, action: PayloadAction<Meeting>) => {
        state.status = 'succeeded';
        state.meetings.push(action.payload);
        state.error = '';
      })
      .addCase(createMeeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateMeeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMeeting.fulfilled, (state, action: PayloadAction<Meeting>) => {
        state.status = 'succeeded';
        const index = state.meetings.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) {
          state.meetings[index] = action.payload;
        }
        state.error = '';
      })
      .addCase(updateMeeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteMeeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMeeting.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.meetings = state.meetings.filter((m) => m._id !== action.payload);
        state.error = '';
      })
      .addCase(deleteMeeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});


export default meetingSlice.reducer;
