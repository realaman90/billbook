import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {Paper, Box, Typography, Divider, Drawer, SwipeableDrawer} from "@mui/material";
import InvoiceDetails from '../page.components/InvoiceDetails';
import InvoiceContactDetails from '../page.components/InvoiceContact'
import ItemsContainer from '../page.components/InvoiceItems';
import InvoiceBottomContainer from '../page.components/InvoiceBottom';
import { PrimaryButton, OutlineButton } from '../micro.reusable.components/Buttons';
import { Close, Delete } from '@mui/icons-material';
import InvoiceSettings from '../page.components/InvoiceSettings';



export default function Invoice (){

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        
        // padding: theme.spacing(1),
        
        color: theme.palette.text.secondary,
        marginTop:10,
      }));
      

      
    return <>
    <Box sx={{padding:'20px 10px', fontFamily:'Montserrat'}}>
        <Grid container spacing={1} columns={{ xs: 1,  md: 12 }}>
        <Grid xs={1} md={8} >
            <Box sx={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                <OutlineButton >Preview</OutlineButton>
                <PrimaryButton> Share</PrimaryButton>
               
            </Box>
            <Item>
                <Divider sx={{ display:{xs:'none', md:'block'}, borderBottomWidth:'thick', background:'#6750a4',  borderTopRightRadius:100,borderTopLeftRadius:100}}/>
                <InvoiceDetails />
                <InvoiceContactDetails />
                <ItemsContainer />
                <InvoiceBottomContainer />
            </Item>
            <Box sx={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                {/* Add navigation to close and redirect user to Invoice list or back */}
                <OutlineButton startIcon={<Close/>} >Close</OutlineButton>
                <OutlineButton startIcon={<Delete />} > Delete</OutlineButton>
               
            </Box>
        </Grid>
            <Grid xs={1} md={4}>
                <Item sx={{marginTop:'55px'}}>
                <InvoiceSettings />
                </Item>
                {/* Swipable drawer for mobile */}
                
            </Grid>

        </Grid>
        
    </Box>
    </>
}