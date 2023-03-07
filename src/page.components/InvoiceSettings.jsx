import {
  Autocomplete,
  Divider,
  Typography,
  TextField,
  IconButton,
  Checkbox,
} from '@mui/material';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import {
  OutlineButton,
  PrimaryButton,
} from '../micro.reusable.components/Buttons';
import { currencies } from '../utils/currencies';
import Input from '../micro.reusable.components/Input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFee, changeCurrency } from '../store';

export default function InvoiceSettings() {
  const [toggle, setToggle] = useState(false);
  const [feeName, setFeeName] = useState('');
  const [feeAmount, setFeeAmount] = useState(null);
  const [feeTax, setFeeTax] = useState(null);

  const dispatch = useDispatch();

  const handleAddFee = () => {
    dispatch(
      addFee({
        name: feeName,
        amount: feeAmount,
        tax: (feeTax * feeAmount) / 100,
        rate: feeTax,
      })
    );
    setFeeName('');
    setFeeAmount(0);
    setFeeTax(0);
  };

  const handleCheckBoxChange = (event) => {
    setToggle(!toggle);
  };

  const handleInputChange = (value) => {
    if (value) {
      dispatch(changeCurrency(value.value));
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography variant="subtitle"> Choose Template</Typography>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography>{'template name'}</Typography>
          <PrimaryButton>Change template</PrimaryButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
          padding: '10px',
        }}
      >
        <Typography variant="subtitle"> Currency</Typography>
        <Autocomplete
          id="country-select-demo"
          size="small"
          fullWidth
          options={currencies}
          autoHighlight
          getOptionLabel={(option) =>
            option.emoji + ' ' + option.label + '  ' + option.value
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.emoji} {option.label} {option.value}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              label="Type"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
          onChange={(event, value, reason) => handleInputChange(value)}
        />
      </Box>
      <Divider></Divider>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle">Add Fee</Typography>
        </Box>
        <Input
          size="small"
          label="Fee Name"
          name="fee"
          value={feeName}
          onChange={(e) => setFeeName(e.target.value)}
        />
        <Input
          size="small"
          label="Fee Amount"
          name="feeAmount"
          value={feeAmount ? feeAmount : ''}
          onChange={(e) => setFeeAmount(parseFloat(e.target.value))}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>Add Tax on fee</Typography>
          <Checkbox onChange={handleCheckBoxChange} size="small" />
        </Box>
        {toggle && (
          <Input
            fullWidth
            size="small"
            label="Tax Percentage"
            name="feeTaxPercentage"
            value={feeTax ? feeTax : ''}
            onChange={(e) => setFeeTax(parseFloat(e.target.value))}
          />
        )}
        <OutlineButton onClick={handleAddFee}>Add Fee</OutlineButton>
      </Box>
    </>
  );
}
