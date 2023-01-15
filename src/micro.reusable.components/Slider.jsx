import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import '../index.css';
import { Slider } from "@mui/material";

export default function ReusableSlider ({input, ...rest}){
    return <StyledEngineProvider injectFirst><Slider /></StyledEngineProvider>
}