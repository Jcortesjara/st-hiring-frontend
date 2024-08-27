import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../features/settingsSlice';
import { RootState, AppDispatch } from '../app/store';

const validationSchema = yup.object({
    clientId: yup.number().required('Client ID is required'),
    body: yup.string().required('Body is required'),
  });

const SettingsForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { settings, loading } = useSelector((state: RootState) => state.settings);

  const formik = useFormik({
    initialValues: {
      clientId: settings?.clientId || '',
      body: settings?.body || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateSettings({ clientId: values.clientId, body: values.body }));
    },
    enableReinitialize: true,
  });

  return (
    <Container className="full-screen-container">
      <Typography variant="h4" gutterBottom>
        Update Settings
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="clientId"
          name="clientId"
          label="Client ID"
          value={formik.values.clientId}
          onChange={formik.handleChange}
          error={formik.touched.clientId && Boolean(formik.errors.clientId)}
          margin="normal"
        />
        <TextField
          fullWidth
          id="body"
          name="body"
          label="Body"
          value={formik.values.body}
          onChange={formik.handleChange}
          margin="normal"
          multiline
          rows={20}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Settings'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              type="reset"
              onClick={formik.handleReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SettingsForm;