import { FormikContextType, FormikValues } from 'formik';
import { Lender } from 'lib/types';

// dummy data for banks [name / slug]
export const lenders: Lender[] = [
  { name: 'Bank of Azeroth', slug: 'bank-of-azeroth' },
  { name: 'Middle Earth Bank', slug: 'middle-earth-bank' },
  { name: 'Naboo Bank', slug: 'naboo-bank' },
  { name: 'SBI', slug: 'sbi' },
];

export const fillDummyData = (
  lenderInfo: Lender,
  formik: FormikContextType<FormikValues>,
): void => {
  switch (lenderInfo.slug) {
    case 'bank-of-azeroth': {
      // fields: ['first_name', 'last_name', 'email', 'gender', 'monthly_income'],
      formik.setFieldValue('first_name', 'Simon');
      formik.setFieldValue('last_name', 'Banker');
      formik.setFieldValue('email', 'simon@banker.com');
      formik.setFieldValue('gender', 'Male');
      formik.setFieldValue('monthly_income', 300000);

      // give formik time to breath and let revalidate
      setTimeout(() => {
        formik.validateForm();
      }, 1);
      break;
    }
    case 'middle-earth-bank': {
      // fields: ['first_name', 'email', 'date_of_birth', 'monthly_income'],
      formik.setFieldValue('first_name', 'Simon');
      formik.setFieldValue('email', 'simon@banker.com');
      formik.setFieldValue('date_of_birth', "1992-02-02T11:35:00.000Z");
      formik.setFieldValue('monthly_income', 200000);
      formik.validateForm();

      // give formik time to breath and let revalidate
      setTimeout(() => {
        formik.validateForm();
      }, 1);
      break;
    }
    case 'naboo-bank': {
      // fields: ['first_name', 'last_name', 'gender', 'contractor'],
      formik.setFieldValue('first_name', 'Simon');
      formik.setFieldValue('last_name', 'Banker');
      formik.setFieldValue('gender', 'Male');
      formik.setFieldValue('contractor', true);
      formik.validateForm();

      // give formik time to breath and let revalidate
      setTimeout(() => {
        formik.validateForm();
      }, 1);
      break;
    }
    case 'sbi': {
      // fields: ['first_name', 'last_name', 'gender','address', 'contractor'],
      formik.setFieldValue('first_name', 'Simon');
      formik.setFieldValue('last_name', 'Banker');
      formik.setFieldValue('gender', 'Male');
      formik.setFieldValue('address', 'Hyderabad,India');
      formik.setFieldValue('contractor', true);
      formik.validateForm();

      // give formik time to breath and let revalidate
      setTimeout(() => {
        formik.validateForm();
      }, 1);
      break;
    }
    default: {
    }
  }
};
