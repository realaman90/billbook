import {
  Box,
  Divider,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Input from '../micro.reusable.components/Input';
import {
  OutlineButton,
  PrimaryButton,
} from '../micro.reusable.components/Buttons';
import { Delete, Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  updateItem,
  addItemTax,
  removeItem,
  useFetchItemsQuery,
} from '../store';

export default function ItemsContainer() {
  const dispatch = useDispatch();
  let { items, currency, locale, state } = useSelector((state) => {
    return {
      items: state.invoiceForm.items,
      currency: state.invoiceForm.currency,
      locale: state.invoiceForm.locale,
      state,
    };
  });
  let currencyFormat = 'en-US';
  if (locale) {
    currencyFormat = locale;
  }
  let { data } = useFetchItemsQuery();
  let itemOptions = [{ name: '' }];
  if (data) {
    itemOptions = data;
  }

  console.log(state);

  const handleAddItem = () => {
    const item = {
      name: '',
      description: '',
      quantity: 0,
      amount: 0,
      discount: 0,
      rate: 0,
      tax: [],
    };
    dispatch(addItem(item));
  };

  const handleAddTax = (index) => {
    let tax = {
      name: '',
      rate: 0,
      amount: 0,
      index,
    };
    dispatch(addItemTax(tax, index));
  };

  const handleDeleteItem = (index) => {
    dispatch(removeItem(index));
  };
  const handleItemChange = (e, value, index) => {
    items = [...items];
    if (typeof value === 'object' && value != null) {
      const { name, discount, id, price, tax, rate, description } = value;

      items[index] = {
        ...items[index],
        name,
        discount,
        id,
        price,
        tax,
        rate,
        description,
      };
      dispatch(updateItem(items));
    } else {
      items[index] = {
        ...items[index],
        name: '',
        rate: '',
        description: '',
        discount: '',
        id: '',
        price: '',
        tax: [{ name: '', rate: 0 }],
      };
      dispatch(updateItem(items));
    }
  };
  const handleItemNameChange = (e, index, value) => {
    if (!value.id) {
      items = [...items];
      items[index] = { ...items[index], name: value };
      dispatch(updateItem(items));
    }
  };

  const handleItemDescriptionChange = (e, index) => {
    const { value } = e.target;

    items = [...items];
    items[index] = { ...items[index], description: value };
    dispatch(updateItem(items));
  };

  const handleItemRateChange = (e, index) => {
    function success(pos) {
      console.log(pos);
    }
    navigator.geolocation.getCurrentPosition(success);
    const { value } = e.target;
    items = [...items];
    let amount = items[index].quantity * value;
    let discountAmount =
      Math.round(
        (amount * (items[index].discount / 100) + Number.EPSILON) * 100
      ) / 100;
    let tax = items[index].tax.map((tax) => {
      return {
        ...tax,
        amount:
          Math.round(
            (((amount - discountAmount) * tax.rate) / 100 + Number.EPSILON) *
              100
          ) / 100,
      };
    });
    items[index] = {
      ...items[index],
      rate: value,
      amount,
      tax,
      discountAmount,
    };
    dispatch(updateItem(items));
  };

  const handleItemQuantityChange = (e, index) => {
    const { value } = e.target;
    items = [...items];
    let amount = items[index].rate * value;
    let discountAmount =
      Math.round(
        (amount * (items[index].discount / 100) + Number.EPSILON) * 100
      ) / 100;
    let tax = items[index].tax.map((tax) => {
      return {
        ...tax,
        amount:
          Math.round(
            (((amount - discountAmount) * tax.rate) / 100 + Number.EPSILON) *
              100
          ) / 100,
      };
    });

    items[index] = {
      ...items[index],
      quantity: value,
      amount,
      tax,
      discountAmount,
    };
    dispatch(updateItem(items));
  };

  const handleItemDiscount = (e, index) => {
    const { value } = e.target;
    items = [...items];
    let discountAmount =
      Math.round((items[index].amount * (value / 100) + Number.EPSILON) * 100) /
      100;
    let tax = items[index].tax.map((tax) => {
      return {
        ...tax,
        amount:
          Math.round(
            (((items[index].amount - discountAmount) * tax.rate) / 100 +
              Number.EPSILON) *
              100
          ) / 100,
      };
    });
    items[index] = { ...items[index], discount: value, discountAmount, tax };
    dispatch(updateItem(items));
  };

  const handleTaxNameChange = (e, index, i) => {
    const { value } = e.target;
    items = [...items];
    let tax = [...items[index].tax];
    tax[i] = { ...tax[i], name: value };
    items[index] = { ...items[index], tax };
    dispatch(updateItem(items));
  };

  const handleTaxRateChange = (e, index, i) => {
    const { value } = e.target;
    items = [...items];
    const tax = [...items[index].tax];
    tax[i] = {
      ...tax[i],
      rate: value,
      amount:
        Math.round(
          (((items[index].amount - items[index].discountAmount) * value) / 100 -
            Number.EPSILON) *
            100
        ) / 100,
    };
    items[index] = { ...items[index], tax };
    dispatch(updateItem(items, i));
  };

  const handleDeleteTax = (index, i) => {
    items = [...items];
    const tax = [...items[index].tax];
    tax.splice(i, 1);
    items[index] = { ...items[index], tax };
    dispatch(updateItem(items));
  };

  //tax for items
  const renderedTaxes = (index) =>
    items[index].tax.map((item, i) => {
      return (
        <Grid
          key={`${i + 1}`}
          container
          columns={{ xs: 8, sm: 12 }}
          spacing={2}
        >
          <Grid xs={1} sm={1}>
            <IconButton
              size="small"
              onClick={() => handleDeleteTax(index, i)}
              sx={{ border: 'solid 1px #6750A4', color: '#6750A4' }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Grid>
          <Grid xs={7} sm={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Input
                input={{
                  id: ``,
                  label: `Tax ${i + 1}`,
                }}
                variant="outlined"
                size="small"
                value={item.name}
                onChange={(e) => handleTaxNameChange(e, index, i)}
              />
            </Box>
          </Grid>
          <Grid xsOffset={1} smOffset={0} xs={8}>
            <Box
              sx={{ display: 'flex', justifyContent: { xs: 'space-between' } }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start' },
                  gap: '10px',
                }}
              >
                <Box sx={{ maxWidth: '120px', minWidth: '50px' }}>
                  <Input
                    input={{
                      id: ``,
                      label: `Tax %`,
                    }}
                    variant="outlined"
                    size="small"
                    width="30px"
                    value={item.rate > 0 ? item.rate : ''}
                    onChange={(e) => handleTaxRateChange(e, index, i)}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: { xs: 'flex' },
                  gap: '5px',
                  justifyContent: 'flex-end',
                  minWidth: '50px',
                }}
              >
                <Typography variant="subtitle" marginTop={'10px'}>
                  {items[index].tax[i].amount >= 0 && currency}
                  {items[index].tax[i].amount >= 0 &&
                    items[index].tax[i].amount}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      );
    });

  // items
  const renderInputs = items.map((item, index) => {
    return (
      <Box key={index} sx={{ padding: 1 }}>
        <Grid container columns={{ xs: 8, sm: 12 }} spacing={2}>
          <Grid xs={1} sm={1}>
            <IconButton
              size="small"
              onClick={() => handleDeleteItem(index)}
              sx={{ border: 'solid 1px #6750A4', color: '#6750A4' }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Grid>
          <Grid xs={7} sm={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Autocomplete
                freeSolo={true}
                id={`item-${index}`}
                options={itemOptions}
                getOptionLabel={(option) => option.name ?? option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label={`Item ${index + 1}`}
                  />
                )}
                onInputChange={(e, value) =>
                  handleItemNameChange(e, value, index)
                }
                onChange={(e, value) => handleItemChange(e, value, index)}
              />
              <Input
                input={{
                  id: `item-${item.id}-Description`,
                  label: `Description`,
                  value: `${item.description}`,
                }}
                variant="outlined"
                size="small"
                multiline
                fullWidth
                onChange={(e) => handleItemDescriptionChange(e, index)}
              />
            </Box>
          </Grid>

          <Grid xsOffset={1} smOffset={0} xs={8} sm={8}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Input
                    input={{
                      id: `${item.id}`,
                      label: `Rate`,
                    }}
                    value={item.rate > 0 ? item.rate : ''}
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ maxWidth: '120px', minWidth: '50px' }}
                    onChange={(e) => handleItemRateChange(e, index)}
                  />
                  <Typography
                    sx={{
                      display: { xs: 'block', sm: 'none' },
                      marginTop: '10px',
                    }}
                  >
                    X
                  </Typography>
                  <Input
                    input={{
                      id: `${item.id}`,
                      label: `Qty`,
                    }}
                    sx={{ maxWidth: '70px', minWidth: '50px' }}
                    type="number"
                    value={item.quantity > 0 ? item.quantity : ''}
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleItemQuantityChange(e, index)}
                  />
                </Box>

                <Box
                  sx={{
                    minWidth: '50px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* Change locale */}
                  <Typography variant="subtitle">
                    {currency}
                    {item.amount}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Input
                  input={{
                    id: `item-${item.discount}-Description`,
                    label: `Discount %`,
                    value: `${item.discount}`,
                  }}
                  type="number"
                  size="small"
                  sx={{ maxWidth: '120px', minWidth: '50px' }}
                  onChange={(e) => handleItemDiscount(e, index)}
                />
                <Box
                  sx={{
                    minWidth: '50px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* Change locale */}
                  <Typography variant="subtitle">
                    {item.discountAmount > 0 ? '-' : ''}
                    {item.discountAmount > 0 ? currency : ''}
                    {item.discountAmount}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box marginBottom={2}>{renderedTaxes(index)}</Box>
        <OutlineButton
          onClick={() => handleAddTax(index)}
          disableElevation
          startIcon={<Add />}
        >
          {' '}
          Add Tax
        </OutlineButton>
      </Box>
    );
  });

  // main render
  return (
    <>
      {/* Title for Bigger screens */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '40px',
          background: '#6750A4',
          color: 'white',
        }}
      ></Box>
      {/* Dynamic Items */}
      {renderInputs}
      <PrimaryButton
        css={{ margin: '10px 7px' }}
        onClick={handleAddItem}
        disableElevation
        startIcon={<Add />}
      >
        {' '}
        Add Item
      </PrimaryButton>
      <Divider />
    </>
  );
}
