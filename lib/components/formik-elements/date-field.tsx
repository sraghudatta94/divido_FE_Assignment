import React from 'react';
import {
  Box,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { FormikContextType, FormikValues } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import DateRangeIcon from '@material-ui/icons/DateRange';

interface DateFieldProps {
  label?: string;
  name: string;
  formik: FormikContextType<FormikValues>;
  required?: boolean;
  format?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  withError: {
    '& label': {
      color: theme.palette.error.main,
    },
    '& p': {
      color: theme.palette.error.main,
    },
  },
  container: {
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
    },
  },
}));

// date field compatible to formik form
const DateField: React.FC<DateFieldProps & Record<string, any>> = ({
  label,
  name,
  formik,
  required = false,
  format = "MM/dd/yyyy"
}) => {
  const classes = useStyles();
  const hasError = formik.touched[name] && Boolean(formik.errors[name]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box
        mb={1}
        display="flex"
        flexDirection="column"
        className={`${classes.container} ${hasError ? classes.withError : ''}`}
      >
        <DatePicker
          autoOk
          value={formik.values[name]}
          invalidDateMessage=""
          clearable
          disableFuture
          onChange={(date) => {
            formik.setFieldTouched(name, true);
            formik.setFieldValue(name, date);
          }}
          TextFieldComponent={(props) => (
            <TextField
              label={label}
              required={required}
              inputRef={props.inputRef}
              value={props.value}
              onClick={props.onClick}
              onChange={props.onChange}
              error={hasError}
              helperText={hasError && formik.errors[name]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                required: false,
              }}
            />
          )}
          placeholder={format.toLowerCase()}
          format={format}
        />
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
