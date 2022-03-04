import {
  LenderFieldConfig,
  FormikFormConfig,
  FieldTypes,
  LenderField,
} from 'lib/types';
import * as Yup from 'yup';

/**
 *
 * This utility will handle and generate dynamic form config
 * This utility has also feature to identify field name and add stuff according to it
 * for email it will add email validation
 * for checkbox it will set default value to false
 * for salary or any number values it add numeric validation
 * possibilities are infinite here :)
 */

// conver simple field definition to fomik field definition
export const buildFormikConfig = (
  schema: LenderFieldConfig,
): FormikFormConfig => {
  // default config
  const formikFormConfig: FormikFormConfig = {
    fields: [],
    initialValues: {},
    validationSchema: {},
  };

  // building config
  schema.forEach((field: string | LenderField) => {
    // generalize field definition
    const lenderField = generalizeFieldDefinition(field);

    // add to the formik field config
    formikFormConfig.fields.push(lenderField);

    // set field's default value and add validation accordingly
    // for normal string field names default value and validation is guessed from its name
    formikFormConfig.initialValues[lenderField.name] = guessValue(lenderField);
    formikFormConfig.validationSchema[lenderField.name] = guessValidation(
      lenderField,
    );
  });

  // convert to master YUP validation schema
  formikFormConfig.validationSchema = Yup.object().shape(
    formikFormConfig.validationSchema,
  );
  return formikFormConfig;
};

// try to generalize field definition so its easy to use
const generalizeFieldDefinition = (field: string | LenderField) => {
  const fieldName = typeof field === 'string' ? field : field.name;
  const label = prepareFieldLabel(fieldName);
  const lenderField = {
    name: fieldName,
    label,
    // for string field we try our best to guess field type
    type: typeof field === 'string' ? guessFieldType(fieldName) : field.type,
    // by default we make string field require as there behavior is unknown
    required: typeof field === 'string' ? true : field.required,
    options: typeof field === 'string' ? [] : field.options,
  };
  return lenderField;
};

// prepare label of field for display and error message as underscore and dash does not look good
const prepareFieldLabel = (fieldName: string) => {
  return fieldName.replace(/_/g, ' ').replace(/-/g, ' ');
};

// try to guess field type for string field based on there name
const guessFieldType = (fieldName: string) => {
  if (fieldName.includes('date')) {
    return FieldTypes.DATE;
  }
  return FieldTypes.TEXT;
};

// guess default value for fields like for checkbox it has to be true/false so we do it here
const guessValue = (field: LenderField) => {
  if (field.type === FieldTypes.CHECKBOX) {
    return false;
  } else if (field.type === FieldTypes.DATE) {
    return null;
  } else {
    return '';
  }
};

// guess validation type for field base on its name
// for ex: if field includes email there is high change it needed to be validated as E-mail address
// we can do some better job making more branches
const guessValidation = (field: LenderField) => {
  const label = field.label;
  // check box
  if (field.type === FieldTypes.CHECKBOX) {
    if (field.required) {
      return Yup.boolean().oneOf([true], `${label} is required.`);
    }
  }
  // date validation
  else if (field.type === FieldTypes.DATE) {
    if (field.required) {
      return Yup.date()
        .typeError(`${label} valid date required.`)
        .nullable(false)
        .required(`${label} is required.`);
    }
  }
  // FieldTypes.TEXT we FieldTypes.SELECT general stuff
  else {
    // email validation
    if (field.name.includes('email')) {
      const emailValidation = Yup.string().email(
        `${label} needed to be in correct email format (ex: name@domain.xxx).`,
      );
      if (field.required) {
        return emailValidation.required(`${label} is required.`);
      }
      return emailValidation;
    }
    // numeric validation
    if (field.name.includes('number') || field.name.includes('income')) {
      const numberValidation = Yup.number().typeError(
        `please enter ${label} in numeric form.`,
      );
      if (field.required) {
        return numberValidation.required(`${label} is required.`);
      }
      return numberValidation;
    }

    // default string require
    if (field.required) {
      return Yup.string().required(`${label} is required.`);
    }

    // nothing plain string
    return Yup.string();
  }
};

// format output before sending to server correcting type if its needed
export const parseDataIfRequired = (data: any) => {
  let parsedData: any = {};
  Object.keys(data).map((fieldName) => {
    if (
      fieldName.includes('number') ||
      fieldName.includes('salary') ||
      fieldName.includes('income')
    ) {
      parsedData[fieldName] = parseFloat(data[fieldName]);
    } else {
      parsedData[fieldName] = data[fieldName];
    }
  });
  return parsedData;
};
