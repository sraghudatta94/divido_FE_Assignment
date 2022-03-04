import { createMuiTheme } from '@material-ui/core/styles';

// Theme instance to override any default value and add GLOBAL level css
const theme = createMuiTheme({
  // override stuff here
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          margin: '0',
          height: '100%',
        },
        body: {
          WebkitFontSmoothing: 'auto',
          margin: '0',
          height: '100%',
        },
        '#nprogress': {
          '& .bar': {
            background: 'white',
          },
          '& .spinner-icon': {
            borderTopColor: 'white',
            borderLeftColor: 'white',
          },
        },
      },
    },
  },
});

export default theme;
