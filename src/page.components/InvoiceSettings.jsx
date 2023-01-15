import { Autocomplete, Divider, Typography, TextField, IconButton} from "@mui/material";
import { Box } from "@mui/system";
import { Add } from "@mui/icons-material";
import { PrimaryButton } from "../micro.reusable.components/Buttons";
import { currencies } from "../utils/countries";
import Input from "../micro.reusable.components/Input";
    

export default function InvoiceSettings(){
    return(
        <>
        <Box sx={{padding:'10px', display:'flex', flexDirection:'column', gap:'10px'}}>
            <Typography variant="subtitle"> Choose Template</Typography>
            <Box sx={{display:'flex', gap: '10px', alignItems:'center'}}>
                <Typography>{'template name'}</Typography>
                <PrimaryButton>Change template</PrimaryButton>
            </Box>
        </Box>
        
        <Box sx={{display:'flex', flexDirection:'column',gap:'10px', justifyContent:'center', padding: '10px'}}>
            <Typography variant="subtitle"> Currency</Typography>
            <Autocomplete
                id="country-select-demo"
                
                size="small"
                fullWidth
                options={currencies}
                autoHighlight
                getOptionLabel={(option) =>option.emoji + ' '+ option.label + '  ' + option.currency}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.emoji} {option.label}  {option.currency}
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
                />
        </Box>
        <Divider></Divider>

        <Box sx={{display:'flex', flexDirection:'column',gap:'10px',padding: '10px'}}>
            < Box sx={{display:'flex',flexDirection:'row',  alignItems:'center',justifyContent:'space-between'}}>
                <Typography variant="subtitle">Add Fee</Typography>
                <IconButton><Add /></IconButton>
            </Box>
            <Input size="small" label="Fee Name" name='fee'/>
            <Input size="small" label="percentage" name='percentage'/>
        </Box>

        </>
    )
}