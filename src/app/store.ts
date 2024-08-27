import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../features/eventsSlice';
import settingsReducer from '../features/settingsSlice';


export const store: any = configureStore({
  reducer: {
    events: eventsReducer,
    settings: settingsReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
