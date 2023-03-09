import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AttachFile } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../micro.reusable.components/Input';
import React from 'react';
import { PrimaryButton } from '../micro.reusable.components/Buttons';
import dayjs from 'dayjs';
import getLocaleDateString from '../utils/dateformat';

export default function InvoiceBottomContainer() {
  const { invoice } = useSelector((state) => {
    return { invoice: state.invoiceForm };
  });

  const renderFee = (label) =>
    invoice.fee.map((fee, index) => {
      if (label === 'label') {
        return (
          <React.Fragment key={index}>
            {fee.name && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>{fee.name}</Typography>
                  <Typography variant="subtitle">
                    {invoice.currency}
                    {fee.amount}
                  </Typography>
                </Box>
                {fee.tax > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography>Tax on {fee.name}</Typography>
                    <Typography variant="subtitle">
                      {invoice.currency}
                      {fee.tax}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </React.Fragment>
        );
      }
    });
  return (
    <>
      <Grid container columns={{ xs: 8, sm: 12 }}>
        <Grid xsOffset={1} xs={7} sm={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '5px',
                margin: '10px 0',
              }}
            >
              <Typography variant="subtitle">Subtotal</Typography>
              <Typography variant="subtitle">
                {invoice.currency}
                {invoice.subtotal}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '5px',
              }}
            >
              {invoice.totalTax >= 0 && <Typography>Taxes</Typography>}
              <Typography variant="subtitle">
                {invoice.currency}
                {invoice.totalTax}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '5px',
              }}
            >
              {invoice.totalDiscount > 0 && <Typography>Discount</Typography>}
              {invoice.totalDiscount > 0 && (
                <Typography variant="subtitle">
                  {invoice.currency}
                  {invoice.totalDiscount}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                justifyContent: 'space-between',
                paddingRight: '5px',
              }}
            >
              {renderFee('label')}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container columns={{ xs: 8, sm: 12 }}>
        <Grid xsOffset={1} xs={7} sm={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: '5px',
            }}
          >
            <Typography marginTop={2} variant="subtitle">
              Total
            </Typography>
            <Typography marginTop={2} variant="subtitle">
              {invoice.currency}
              {invoice.total}
            </Typography>
          </Box>
          {invoice.payments.length > 1 && (
            <Box
              sx={{
                margin: '10px 0px',
              }}
            >
              <Typography variant="subtitle">Payment Record</Typography>
              <Box
                sx={{
                  margin: '10px 0px',
                }}
              >
                {invoice.payments.map(
                  (payment, index) =>
                    payment.amount > 0 && (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="italic">{`${dayjs(
                          payment.date
                        ).format(getLocaleDateString())}`}</Typography>
                        <Typography variant="subtitle">
                          {invoice.currency}
                          {payment.amount}
                        </Typography>
                      </Box>
                    )
                )}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Divider />
      <Grid container columns={{ xs: 8, sm: 12 }}>
        <Grid xsOffset={1} xs={7} sm={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: '5px',
              margin: '10px 0px',
            }}
          >
            <Typography variant="subtitle">Balance Due</Typography>
            <Typography variant="subtitle">
              {invoice.currency}
              {invoice.balanceDue}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 8, md: 12 }}>
        <Grid xsOffset={1} xs={7} sm={10}>
          <Box>
            <Input label="Additional Notes" fullWidth multiline></Input>
          </Box>
        </Grid>
      </Grid>
      <Box margin={2}>
        <PrimaryButton
          css={{ cursor: 'pointer', marginBottom: '20px' }}
          startIcon={<AttachFile fontSize="small"></AttachFile>}
        >
          <label htmlFor="files" style={{ cursor: 'pointer' }}>
            Attach File
          </label>
          <input
            name="uploads"
            id="files"
            type="file"
            style={{ display: 'none' }}
            accept=".jpg, .jpeg, .png, .svg, .gif , .pdf , .docx"
          />
        </PrimaryButton>
      </Box>
    </>
  );
}
