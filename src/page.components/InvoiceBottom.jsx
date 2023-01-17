import { Box,  Divider, Typography, IconButton, Tooltip } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { AttachFile} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import Input from "../micro.reusable.components/Input";
import React from "react";
import { PrimaryButton } from "../micro.reusable.components/Buttons";

export default function InvoiceBottomContainer(){

    const {invoice} = useSelector(state=> {return{invoice:state.invoiceForm}});
    const renderFeeLabel =(label)=> invoice.fee.map((fee,index) =>{
        if(label === 'label'){
            return <React.Fragment key={index}>
            {invoice.fee[0].amount > 0 &&
            <>
            <Typography>{fee.name}</Typography>
            <Typography>Tax on {fee.name} {fee.rate}%</Typography>
            </>
            }
        </React.Fragment>
        }else{
            return<React.Fragment key={index}>
            {invoice.fee[0].amount > 0 &&
            <>
            <Typography key={index}>{invoice.currency}{fee.amount}</Typography>
            <Typography key={index +1}>{invoice.currency}{fee.tax}</Typography>
            </>
            }
            </React.Fragment>
        }
    })
    return <>
        <Grid container columns={{xs:8, sm:12}}>
            
            <Grid xsOffset={1}  xs={3} sm={4}>
                <Box sx={{display:'flex', flexDirection:'column',}}>
                    <Box sx={{display:'flex', flexDirection:'column',}}>
                        <Typography variant="subtitle">Subtotal</Typography>
                        {invoice.totalTax >= 0 && <Typography>Taxes</Typography>}
                        {invoice.totalDiscount >0 && <Typography>Discount</Typography>}
                        {renderFeeLabel('label')}
                        
                        
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'column',}}><Typography marginTop={2} variant="subtitle">Total</Typography>
                        <Typography variant="subtitle" >Balance Due</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={4} smOffset={2} sm={5} sx={{display:'flex',  justifyContent:'flex-end'}}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="subtitle">{invoice.currency}{invoice.subtotal}</Typography>
                    <Typography>{invoice.totalTax >= 0 && invoice.currency}{invoice.totalTax >= 0 && invoice.totalTax }</Typography>
                    {invoice.totalDiscount >0 && <Typography>{invoice.currency}{invoice.totalDiscount}</Typography>}
                    {renderFeeLabel()}
                    
                    
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', margin:'10px,0px'}}>
                    <Typography marginTop={2} variant="subtitle">{invoice.currency}{invoice.total}</Typography>
                    <Typography variant="subtitle">{invoice.currency}{invoice.balanceDue}</Typography>

                </Box>
                </Box>
            </Grid>
            

        </Grid>
        <Grid container columns={{xs:8, md:12}}
        >
            
            <Grid xsOffset={1} xs={7} sm={10}>
                <Box>
                    
                    <Input label='Additional Notes' fullWidth multiline></Input>
                
                </Box></Grid>            
            
        </Grid>
        <Box margin={2} >
                <PrimaryButton css={{cursor:'pointer', marginBottom:'20px'}} startIcon={<AttachFile fontSize="small"></AttachFile>} >
                <label htmlFor="files" style={{cursor:'pointer'}}>
                    
                    Attach File
                </label>
                <input name='uploads' id='files' type='file' style={{display:'none'} } accept=".jpg, .jpeg, .png, .svg, .gif , .pdf , .docx" />
                </PrimaryButton>
                
        </Box>
      
    </>
}