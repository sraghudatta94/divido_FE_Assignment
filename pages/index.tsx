import {
  Typography,
  List,
  ListItem,
  Grid,
  Container,
  Paper,
  Box,
} from '@material-ui/core';
import { NextPage } from 'next';
import Link from 'next/link';

import { useAppStyles } from 'lib/utils/style';
import { lenders } from 'lib/utils/data';

const HomePage: NextPage = () => {
  const classes = useAppStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={3}>
        <Grid container>
          <Grid item md={12}>
            <Box p={2}>
              <Typography variant="h5" component="h5">
                Select any bank for Application Form
              </Typography>
              <List>
                {lenders.map((lender) => (
                  <ListItem key={lender.name}>
                    <Link data-testid={lender.slug} href={`/${lender.slug}`}>
                      <a>
                        <Typography>{lender.name}</Typography>
                      </a>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
