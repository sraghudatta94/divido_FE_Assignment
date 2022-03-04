import Link from 'next/link';
import { useCallback } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import Swal from 'sweetalert2';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useAppStyles } from 'lib/utils/style';
import { Api } from 'lib/utils/api';
import { lenders } from 'lib/utils/data';
import { Lender, LenderFormConfig, LenderPostResponse } from 'lib/types';
import FormEngine from 'lib/components/form-engine';
import { parseDataIfRequired } from 'lib/utils/form-config-builder';
import { useTheme } from '@material-ui/styles';

interface LenderFormPageProps {
  lenderInfo: Lender | undefined;
  lenderFormConfig: LenderFormConfig;
}

// Lender Form Page - it will show form of Lender Bank
const LenderFormPage: NextPage<LenderFormPageProps> = ({
  lenderInfo,
  lenderFormConfig,
}) => {
  const theme = useTheme<Theme>();
  const classes = useAppStyles();
  const router = useRouter();

  // final submit call which will try to send user data to server
  const onSubmit = useCallback(
    async (userData: any): Promise<boolean> => {
      if (lenderInfo) {
        // try if any error show in console ATM we are not handling it for dummy data
        try {
          const parsedData = parseDataIfRequired(userData);
          // submit data
          const response = await Api.submitApplicantFormToBank(
            lenderInfo.slug,
            parsedData,
          );
          const lenderResponse: LenderPostResponse = await response.json();

          // act according to response
          if (lenderResponse.decision === 'accepted') {
            // accepted alert
            Swal.fire({
              title: 'Your Application is accepted. Congratulations!',
              text: 'further note to user',
              icon: 'success',
              confirmButtonColor: theme.palette.primary.main
            });
            // return promise resolve data
            return true;
          } else {
            // declined alert
            Swal.fire({
              title: 'Yor Application is declined.',
              text: 'further note to user what he can do for acceptance',
              icon: 'error',
              confirmButtonColor: theme.palette.primary.main
            });
            // return promise resolve data
            return false;
          }
        } catch (e) {
          // not handling errors ATM
          console.log(e);
        }
      }

      // if lender not present return false
      return false;
    },
    [theme, lenderInfo],
  );

  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <Box p={2}>
              {/* If invalid name added to user show error and allow user to go home page */}
              {!lenderInfo ? (
                <>
                  <Typography variant="h5" component="h5">
                    Invalid Lender
                  </Typography>
                  <Link href="/">
                    <a>Go Back</a>
                  </Link>
                </>
              ) : (
                <>
                  <Box display="flex" alignItems="center">
                    <Link href="/">
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Link>
                    <Typography variant="h5" component="h5">
                      {lenderInfo.name}
                    </Typography>
                  </Box>
                  {/* Our form builder pass lenderFormConfig and it will show form */}
                  <FormEngine
                    lenderInfo={lenderInfo}
                    formConfig={lenderFormConfig}
                    onSubmit={onSubmit}
                    onCancel={() => router.push(`/`)}
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

// we are not going to use static path as idea is those stuff will be dynamic
// maybe come from database and we do not want to build our app every-time we add new bank and its form config
// export const getStaticPaths: GetStaticPaths = async () => {}

// used for server side rendering
// server-side when refresh on lenderFormPage it should server data Right away not make fetch call for form-config
// client-side when routed to this page API call made by next and this props provided to the LenderForm component
export const getServerSideProps: GetServerSideProps = async (context) => {
  // declaration
  let { lenderForm: lenderParam } = context.query;
  let lenderSlug: string = '';
  let lenderInfo: Lender | undefined = undefined;
  let lenderFormConfig: any = {};

  // query is returning array so if it array pick first param
  if (Array.isArray(lenderParam) && lenderParam.length > 0) {
    lenderSlug = lenderParam[0] as string;
  } else {
    lenderSlug = lenderParam as string;
  }

  // try to fetch data from server for lenderFormConfig
  if (lenderSlug) {
    try {
      // fetch definition for lender
      const res = await Api.getFormDefinitionForBank(lenderSlug);
      lenderFormConfig = await res.json();

      // lender info may be in future this also can be fetched from API
      // or can be combined with definition call
      lenderInfo = lenders.find((lender) => lender.slug === lenderSlug);
    } catch (e) {
      // if we are not able to get lenderForm config
      // we assume there is some issue
      // we make that lender unavailable for time being
      lenderInfo = undefined;
    }
  }

  // return props for our LenderFormPage component
  return {
    props: {
      lenderInfo: lenderInfo || null,
      lenderFormConfig,
    },
  };
};

export default LenderFormPage;
