import { TextField } from "@mui/material";

import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import '../index.css'


export default function Input ({input, ...rest}){
    return <TextField {...input} {...rest} inputProps={{fontFamily:'monospace'}} />
}