
import React, { useState } from "react";
import { AttachFile, Close } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { PrimaryButton } from "./Buttons";



export default function FileUpload ({label,onChange}){

    const [file, setFile] = useState('');
    const handleFile = event =>{
        setFile(event.target.files[0])
        onChange(event.target.files[0])
    }
    
    return(
        <div style={{display:'flex',gap:'10px', }}>
        <PrimaryButton  startIcon={ <AttachFile fontSize="small"></AttachFile>}>
          <label htmlFor="files" style={{width:"100%",cursor:'pointer'}}>
          {label}
            </label>
        <input name='uploads' id='files' type='file' style={{display:'none'} } accept=".jpg, .jpeg, .png, .svg, .gif , .pdf , .docx" onChange={handleFile} />      
            
        </PrimaryButton>
        {file &&  <Box sx={{display:'flex', gap:'10px', alignItems:'center'}}><Typography>{file.name}</Typography>
        <Close color="primary" fontSize="small" onClick={()=>setFile('')}/></Box>}
        </div>
    )
}

