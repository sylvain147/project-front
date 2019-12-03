import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#850606',
    },
    secondary: {
      main: '#056A05',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  navBar: {
    link: {
      color: '#000'
    }
  }
});

export default theme;
