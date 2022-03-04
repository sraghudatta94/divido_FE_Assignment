import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { FormikContextType, FormikValues } from 'formik';

interface SelectFieldProps {
  label?: string;
  name: string;
  options?: Array<{ label: string; value: string }>;
  formik: FormikContextType<FormikValues>;
  required?: boolean;
  showEmpty?: boolean;
  placeholder?: string;
}

// select field compatible to formik form
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  formik,
  required,
  showEmpty = true,
  placeholder = 'Please Select Value',
}) => {
  const hasError = formik.touched[name] && Boolean(formik.errors[name]);
  return (
    <TextField
      select
      fullWidth
      id={name}
      name={name}
      label={label}
      value={formik.values[name]}
      required={required}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={hasError}
      helperText={hasError && formik.errors[name]}
      inputProps={{
        required: false,
      }}
    >
      {showEmpty && <MenuItem value="">{placeholder}</MenuItem>}
      {options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
