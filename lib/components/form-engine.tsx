import { useMemo, useState } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core';
import { FormikContextType, FormikValues, useFormik } from 'formik';

import { FieldTypes, Lender, LenderField, LenderFormConfig } from 'lib/types';
import { buildFormikConfig } from 'lib/utils/form-config-builder';

import DateField from 'lib/components/formik-elements/date-field';
import TextField from 'lib/components/formik-elements/text-field';
import SelectField from 'lib/components/formik-elements/select-field';
import CheckboxField from 'lib/components/formik-elements/checkbox-field';

import { fillDummyData } from 'lib/utils/data';

interface FormEngineProps {
  lenderInfo: Lender;
  formConfig: LenderFormConfig;
  onSubmit: (userData: any) => Promise<boolean>;
  onCancel: () => void;
}

export const useStyles = makeStyles((theme: Theme) => ({
  form: {
    '& label': {
      textTransform: 'capitalize',
    },
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  actionBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  fillBtn: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      justifyContent: 'center'
    }
  }
}));

// form builder based on given configuration
const FormEngine: React.FC<FormEngineProps> = ({
  lenderInfo,
  formConfig,
  onSubmit,
  onCancel,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  // memo config only change if fields are changed
  const formikConfig = useMemo(() => {
    return buildFormikConfig(formConfig.fields);
  }, [formConfig]);

  // formik form handler
  // take cares of values, validation and submit function
  const formik: FormikContextType<any> = useFormik({
    initialValues: formikConfig.initialValues,
    validationSchema: formikConfig.validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const result: boolean = await onSubmit(values);
      if (result) {
        formik.resetForm();
      }
      setLoading(false);
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {/* generating dynamic field component array and rendering */}
      {formikConfig.fields.map((field) => getDynamicField(field, formik))}
      {/* footer buttons cancel/submit */}
      <Box className={classes.btnContainer}>
        <Box className={classes.actionBtns}>
          <Button disabled={loading} variant="contained" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            color="secondary"
            variant="contained"
            onClick={() => formik.resetForm()}
          >
            Reset
          </Button>
          <Button
            disabled={loading}
            color="primary"
            type="submit"
            variant="contained"
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            Submit
          </Button>
        </Box>
        <Box className={classes.fillBtn}>
          <Button
            disabled={loading}
            color="primary"
            variant="contained"
            onClick={() => fillDummyData(lenderInfo, formik)}
          >
            Fill Dummy Data
          </Button>
        </Box>
      </Box>
    </form>
  );
};

// this function can also be extended and improved a lot 
// we can create map of field components and map directly to type for future
const getDynamicField = (
  field: LenderField,
  formik: FormikContextType<FormikValues>,
): React.ReactNode => {
  switch (field.type) {
    case FieldTypes.TEXT: {
      return (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          formik={formik}
          required={field.required}
        />
      );
    }
    case FieldTypes.SELECT: {
      return (
        <SelectField
          key={field.name}
          label={field.label}
          options={field.options?.map((item) => ({
            label: item,
            value: item,
          }))}
          name={field.name}
          formik={formik}
          required={field.required}
        />
      );
    }
    case FieldTypes.DATE: {
      return (
        <DateField
          key={field.name}
          label={field.label}
          name={field.name}
          formik={formik}
          required={field.required}
        />
      );
    }
    case FieldTypes.CHECKBOX: {
      return (
        <CheckboxField
          key={field.name}
          label={field.label}
          name={field.name}
          formik={formik}
          required={field.required}
        />
      );
    }
    default:
      return null;
  }
};

export default FormEngine;
