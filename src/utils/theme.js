import { createTheme, } from "@mui/material";


const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '575px !important',
          padding: '0px !important',
          background: '#0A001B',
        }
      },
    }
  },
  palette: {
    primary: {
      main: '#6C10ED',
    }
  }
});

export default theme;
