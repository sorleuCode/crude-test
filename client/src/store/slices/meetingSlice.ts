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

export const fetchMeetings = createAsyncThunk(
  'meetings/fetchMeetings',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/meetings', {
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to fetch meetings');
    }
  }
);

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeetings.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.status = 'succeeded';
        state.meetings = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default meetingSlice.reducer;
