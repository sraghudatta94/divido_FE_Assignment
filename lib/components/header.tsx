import Link from 'next/link';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';

import { useAppStyles } from 'lib/utils/style';

const Header: React.FC = () => {
  const classes = useAppStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <SpeakerNotesIcon />
          </IconButton>
        </Link>
        <Link href="/">
          <a className={classes.logoLink}>
            <Typography variant="h6">Bank Application Form</Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
