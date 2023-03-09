import { useState } from 'react';

import { Box, Divider, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import getLocaleDateString from '../utils/dateformat';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Input from '../micro.reusable.components/Input';
import ImageUpload from '../micro.reusable.components/ImageUploader';

import { updateDetails } from '../store';
import { padding } from '@mui/system';

export default function InvoiceDetails() {
  //get invoice details from store
  let { details } = useSelector((state) => {
    return {
      details: state.invoiceForm.details,
    };
  });
  const dispatch = useDispatch();

  //for Date picket
  const [value, setValue] = useState(dayjs(Date.now()));

  const handleInvoiceNumberChange = (event) => {
    const { value } = event.target;
    details = { ...details, invoiceNumber: value };
    console.log(details);
    dispatch(updateDetails(details));
  };
  // For Invoice Name
  const handleInvoiceNameChange = (event) => {
    const { value } = event.target;
    details = { ...details, invoiceName: value };
    dispatch(updateDetails(details));
  };
  // for date
  const handleDate = (value) => {
    const date = dayjs(value['$d']).format();
    details = { ...details, invoiceDate: date };
    dispatch(updateDetails(details));
  };
  //for due date
  const handleDueDate = (value) => {
    const date = dayjs(value['$d']).format();
    details = { ...details, invoiceDueDate: date };
    dispatch(updateDetails(details));
  };
  //for image
  const serverCall = axios.create({
    baseURL: 'http://localhost:5000',
  });
  const handleImage = async (file) => {
    // call aws server
    const response = await serverCall.get('/api/v1/s3Url');
    const { url } = response.data;
 
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: file,
    });
    details = { ...details, invoiceLogo: url.split('?')[0] };
    dispatch(updateDetails(details));
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        columns={{ xs: 6 }}
        sx={{ marginBottom: '10px', padding: 1 }}
      >
        <Grid
          xs={6}
          md={3}
          sx={{
            display: { xs: 'flex', md: 'block' },
            justifyContent: 'center',
          }}
        >
          <ImageUpload
            styleProps={{
              width: { xs: 120, sm: 150, md: 200 },
              height: { xs: 120, sm: 150, md: 200 },
            }}
            hoverStyles={{
              cursor: 'pointer',
              border: 'solid 1px #6750a4',
            }}
            label="Logo or Image"
            onChange={handleImage}
          />
        </Grid>
        <Grid xs={6} md={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Input
              input={{
                id: 'input1',
                label: 'Invoice Number',
              }}
              variant="outlined"
              size="small"
              value={details.invoiceNumber}
              onChange={handleInvoiceNumberChange}
            />
            <Input
              input={{
                id: 'input2',
                label: 'Invoice Name',
                value: `${details.invoiceName}`,
              }}
              variant="outlined"
              size="small"
              onChange={handleInvoiceNameChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Invoice Date"
                inputFormat={getLocaleDateString()}
                value={details.invoiceDate}
                onChange={(newValue) => handleDate(newValue)}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Invoice Due Date"
                inputFormat={getLocaleDateString()}
                value={details.invoiceDueDate}
                onChange={(newValue) => handleDueDate(newValue)}
                minDate={value}
                renderInput={(params) => (
                  <TextField size="small" {...params} sx={{}} />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}
