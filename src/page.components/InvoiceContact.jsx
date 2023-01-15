import { Box,  TextField,Autocomplete,Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchClientsQuery, updateClient, updateSender, useFetchSenderQuery, useFetchItemsQuery } from "../store";
import Input from "../micro.reusable.components/Input";


export default function InvoiceContactDetails (){
    let {client, sender,} = useSelector(state=>{
        return {
            client: state.invoiceForm.client,
            sender:state.invoiceForm.sender,

        }
    }); 
    

    
    const {data} = useFetchClientsQuery();
    const currentSender = useFetchSenderQuery().data
    
    if(currentSender && sender.id ===''){
       sender = currentSender[0];
    };
    
   
    const dispatch = useDispatch();
   
    let clients = [];
    if (data){
        clients = data
        
    }
    const handleInputChange = (value)=>{
       
        if(typeof(value) === 'object' && value != null){
            const{name,address,email,businessNumber,phone,pinCode,vat} = value
                    client = {
                        name,address,email,businessNumber,phone,pinCode,vat

                    }
                    dispatch(updateClient(client))
        } else{
            client={...client,id:'',name:'',email:'',address:'',pinCode:'',vat:'',businessNumber:'', phone:''}
            dispatch(updateClient(client));
        }
    }
    const handleClientNameChange = (event,value)=>{
       if(!value.id){
         client = {...client, name:value}
         dispatch(updateClient(client))
       }        
        
    };


    let emailErrorVal='';
    let senderEmailErrorVal='';
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if(!regex.test(client.email)&& client.email.length > 0){
        emailErrorVal= 'Please enter valid mail'
    }
    if(!regex.test(sender.email)&& sender.email.length > 0){
        
        senderEmailErrorVal = 'Please enter valid email'
    }
    




    return <>
        <Grid 
        container 
        spacing={2} 
        columns={{xs:1, sm:12}}
        sx={{margin:'10px 0', padding:1}}

        >
            {/* Invoice Form Top Left Corner */}
            <Grid xs={1} sm={6} 

            >
                <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'20px'
                    }}
                >
                    <Typography variant="h6" sx={{fontFamily:'GillSansCondC', fontWeight:600, fontStyle:'normal'}}> TO </Typography>
                    
                    <Autocomplete
                        freeSolo={true}
                        id='client-input'
                        options={clients}
                        getOptionLabel={option => option.name?? option}
                        renderInput={
                            params => <TextField {...params} 
                                        label='Client' 
                                        size='small' 
                                        
                                      />                        }
                        onChange={(event,value,reason) => handleInputChange(value)}
                        onInputChange={(event, value, reason) => handleClientNameChange(event, value)}
                    /> 
                    <Input 
                        input={{
                        
                        id:'clientEmail',
                        label: 'Email',                       
                        }} 
                        value={client.email}
                        variant="outlined" required size="small"
                        error={emailErrorVal.length > 1}
                        helperText={emailErrorVal.length > 1 ? 'Please enter a valid Email': ''}
                        onChange={e=>{
                            client = {...client, email:e.target.value.toLowerCase()};
                            dispatch(updateClient(client))
                        }}

                    />
                    <Input 
                        input={{
                        id:'clientAddress',
                        label: 'Address',                       
                        }}
                        value={client.address}
                        variant="outlined"  size="small"  
                        onChange={e=>{
                            client = {...client, address:e.target.value};
                            dispatch(updateClient(client))
                        }}

                        
                    />
                    <Input 
                        input={{
                        id:'clientPin',
                        label: 'Pin Code', 
                        type:'Number'                     
                        }}
                        value={client.pinCode}
                        variant="outlined"  size="small"
                        onChange={e=>{
                            client = {...client, pinCode:e.target.value};
                            dispatch(updateClient(client))
                        }}
                        
                    />
                    <Input 
                        input={{
                        id:'clientPhone',
                        label: 'Phone',                       
                        }} 
                        value={client.phone}
                        variant="outlined"  size="small" 
                        onChange={e=>{
                            client = {...client, phone:e.target.value};
                            dispatch(updateClient(client))
                        }}
                    />
                    <Input 
                        input={{
                        id:'clientVAT',
                        label: 'VAT',                       
                        }}
                        value={client.vat}
                        variant="outlined"  size="small"
                        onChange={e=>{
                            client = {...client, vat:e.target.value};
                            dispatch(updateClient(client))
                        }}

                    />
                    <Input 
                        input={{
                        id:'clientBusinessNumber',
                        label: 'Business Identification Number',                       
                        }}
                        value={client.businessNumber}
                        variant="outlined"  size="small"
                        onChange={e=>{
                            client = {...client, businessNumber:e.target.value};
                            dispatch(updateClient(client))
                        }}
                       
                    />
                </Box>
            </Grid>
            {/* Sender Form Top Right Corner */}
            <Grid xs={1} sm={6} 

            >
                <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'20px'
                    }}
                >
                    <Typography variant="h6" sx={{fontFamily:'GillSansCondC', fontWeight:600, fontStyle:'normal'}}> FROM </Typography>
                    
                    <Input 
                        input={{
                        id:'SenderName',
                        label: 'Your Business Name',                       
                        }} 
                        variant="outlined"  size="small" 
                        value={sender.name}
                        onChange={e=>{
                            sender={...sender,name:e.target.value};
                            dispatch(updateSender(sender))
                        }}
                        
                       
                    />
                    <Input 
                        input={{
                        
                        id:'senderEmail',
                        label: 'Email',                       
                        }} 
                        variant="outlined" required size="small" 
                        value={sender.email}
                        error={senderEmailErrorVal.length > 1}
                        helperText={senderEmailErrorVal.length > 1 ? 'Please enter a valid email':''}
                        onChange={e=>{
                            sender={...sender,email:e.target.value};
                            dispatch(updateSender(sender))
                        }}
                        
                    />
                    <Input 
                        input={{
                        id:'senderAddress',
                        label: 'Address',                       
                        }} 
                        variant="outlined"  size="small" 
                        value={sender.address}
                        onChange={e=>{
                            sender={...sender,address:e.target.value};
                            dispatch(updateSender(sender))
                        }}
                        
                    />
                    <Input 
                        input={{
                        id:'senderPin',
                        label: 'Pin Code',
                        type:'Number'                       
                        }} 
                        variant="outlined"  size="small" 
                        value={sender.pinCode}
                        onChange={e=>{
                            sender={...sender,pinCode:e.target.value};
                            dispatch(updateSender(sender))
                        }}
                    />
                    <Input 
                        input={{
                        id:'senderPhone',
                        label: 'Phone',                       
                        }} 
                        variant="outlined"  size="small"
                        value={sender.phone}
                        onChange={e=>{
                            sender={...sender,phone:e.target.value};
                            dispatch(updateSender(sender))
                        }}
                        
                    />
                    <Input 
                        input={{
                        id:'senderVAT',
                        label: 'VAT',                       
                        }} 
                        variant="outlined"  size="small" 
                        value={sender.vat}
                        onChange={e=>{
                            sender={...sender,vat:e.target.value};
                            dispatch(updateSender(sender))
                        }}
                        
                       
                    />
                    <Input 
                        input={{
                        id:'senderBusinessNumber',
                        label: 'Business Identification Number',                       
                        }} 
                        variant="outlined"  size="small" 
                        value={sender.businessNumber}
                        onChange={e=>{
                            sender={...sender,businessNumber:e.target.value};
                            dispatch(updateSender(sender))
                        }}
                        
                    />
                </Box>
            </Grid>
        
        
        </Grid>
    </>
}

