import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from './features/eventsSlice';
import { RootState, AppDispatch } from './app/store';
import { Container, Grid, Typography } from "@mui/material";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { events, loading, error } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Events List
      </Typography>
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
              <Typography variant="h6">{event.name}</Typography>
              <Typography variant="body2">{event.author}</Typography>
              <Typography variant="body1">{event.location}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;