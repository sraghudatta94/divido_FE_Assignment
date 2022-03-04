import { makeStyles, Theme } from '@material-ui/core';

// app wide style
export const useAppStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  logoLink: {
    color: 'white',
    textDecoration: 'none !important',
  },
}));
