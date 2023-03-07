import { Box, Divider, Typography, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AttachFile } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../micro.reusable.components/Input';
import React from 'react';
import { PrimaryButton } from '../micro.reusable.components/Buttons';

export default function InvoiceBottomContainer() {
  const { invoice } = useSelector((state) => {
    return { invoice: state.invoiceForm };
  });
  const renderFee = (label) =>
    invoice.fee.map((fee, index) => {
      if (label === 'label') {
        return (
          <React.Fragment key={index}>
            {invoice.fee[1] && (
              <>
                <Typography>{fee.name}</Typography>
                <Typography>
                  Tax on {fee.name} {fee.rate}%
                </Typography>
              </>
            )}
          </React.Fragment>
        );
      }
      // else{
      //     return<React.Fragment key={index}>
      //     {invoice.fee[0].amount > 0 &&
      //     <>
      //     <Typography key={index}>{invoice.currency}{fee.name}</Typography>
      //     <Typography key={index + 1}>{invoice.currency}{fee.amount}</Typography>
      //     </>
      //     }
      //     </React.Fragment>
      // }
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
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '5px',
              }}
            >
              {renderFee('label')}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography marginTop={2} variant="subtitle">
                Total
              </Typography>
              <Typography variant="subtitle">Balance Due</Typography>
            </Box>
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
