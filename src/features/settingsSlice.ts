import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface UpdateSettingsParams {
  clientId: string;
  body: string;
}

interface SettingsState {
  settings: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
};

export const updateSettings = createAsyncThunk<string, UpdateSettingsParams, { rejectValue: string }>(
  'settings/updateSettings',
  async ({ clientId, body }, { rejectWithValue }) => {
    try {
      const jsonBody = JSON.parse(JSON.stringify(body));
      console.log('jsonBody', jsonBody);
      const response = await fetch(`http://localhost:3000/settings/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonBody,
      });
      if (!response.ok) {
        return rejectWithValue('Failed to update settings');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);


const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default settingsSlice.reducer;

