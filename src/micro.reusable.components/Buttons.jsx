import { Button } from "@mui/material";


function PrimaryButton ({children,onClick,css, ...rest}){
    
    
    return <Button variant={"contained"} onClick={onClick} sx={{borderRadius:50, ...css}}  {...rest}  >
        {children}
    </Button>
}
function OutlineButton ({children,onClick, ...rest}){
    return <Button variant={"outlined"} onClick={onClick} sx={{borderRadius:50}} {...rest}>
        {children}
    </Button>
}

export {PrimaryButton, OutlineButton}