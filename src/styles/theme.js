import { createTheme } from '@mui/material/styles';
// import GillSans from './styles/font/GillSansCondC.ttf'
import Montserrat from './font/Montserrat/Montserrat-VariableFont_wght.ttf'


export  const theme = createTheme({
  
  palette: {
     primary: {
      main: '#6750a4',
      dark: '#462B8C',
      contrastText: '#E6E1E5',
    },
    secondary: {
      main: '#49454F',
      light: '#7986cb',
      contrastText: '#E6E1E5',
      dark: '#1C1B1F',
    },
    
  

   
   
},
components: {
  // Name of the component
  MuiButton: {
    styleOverrides: {      

      root: {        

        fontFamily:'Montserrat, sans-serif',
        fontSize: '.9rem',
        fontWeight: 500,
        textTransform: 'none',
        '@media (max-width:1344px)': {
          fontSize: '0.75rem',
        },
        '@media (max-width:1024px)': {
          fontSize: '0.65rem',
        },
      },
    },
  },
  MuiTextField:{
    styleOverrides:{
      root:{
        fontFamily:'Montserrat, sans-serif'
      },
      MuiInputLabel:{
        fontWeight:400
      }

    }
  }
},
typography: {
  
  fontFamily: 'Montserrat, sans-serif',
  subtitle1: {
    fontSize: 12,
  },
  subtitle: {
    fontWeight: 600,
    fontStyle:'bold',
    '@media (max-width:600px)': {
      fontSize: '0.75rem',
    },
  },
  body1:{
    fontSize:'1rem',
    '@media (max-width:600px)': {
      fontSize: '0.75rem',
    },
  
},
},

});