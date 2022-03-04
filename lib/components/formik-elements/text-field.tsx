import React from 'react';
import { Box, TextField as MuiTextField } from '@material-ui/core';
import { FormikContextType, FormikValues } from 'formik';

interface TextFieldProps {
  label?: string;
  name: string;
  formik: FormikContextType<FormikValues>;
  required?: boolean;
}

// text field compatible to formik form
const TextField: React.FC<TextFieldProps & Record<string, any>> = ({
  label,
  name,
  formik,
  required = false,
}) => {
  const hasError = formik.touched[name] && Boolean(formik.errors[name]);
  return (
    <Box mb={2}>
      <MuiTextField
        fullWidth
        id={name}
        name={name}
        label={label}
        required={required}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={hasError}
        helperText={hasError && formik.errors[name]}
        inputProps={{
          required: false,
        }}
      />
    </Box>
  );
};

export default TextField;
