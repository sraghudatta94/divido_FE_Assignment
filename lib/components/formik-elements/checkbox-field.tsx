import React from 'react';
import {
  Box,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { FormikContextType, FormikValues } from 'formik';

interface CheckboxField {
  label?: string;
  name: string;
  formik: FormikContextType<FormikValues>;
  required?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  withError: {
    color: theme.palette.error.main,
  },
}));

// checkbox field compatible to formik form
const CheckboxField: React.FC<CheckboxField> = ({
  label,
  name,
  formik,
  required,
}) => {
  const classes = useStyles();
  const hasError = formik.touched[name] && Boolean(formik.errors[name]);
  return (
    <Box my={2} className={hasError ? classes.withError : ''}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values[name]}
          />
        }
        label={`${label} ${required ? '*' : ''} `}
      />
      {hasError && (
        <FormHelperText className={classes.withError}>
          {formik.errors[name]}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CheckboxField;
