export enum FieldTypes {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
}

export interface Lender {
  name: string;
  slug: string;
}

export type LenderFieldConfigSimple = Array<
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'date_of_birth'
  | 'monthly_income'
  | 'gender'
  | 'address'
>;

export interface LenderField {
  name: string;
  label?: string;
  type: FieldTypes;
  required: boolean;
  options?: Array<string>;
}

export type LenderFieldConfigExtended = Array<LenderField>;

export type LenderFieldConfig =
  | LenderFieldConfigSimple
  | LenderFieldConfigExtended;

export interface LenderGetResponse {
  name: string;
  fields: LenderFieldConfigSimple;
}

export interface LenderGetResponseExtended {
  name: string;
  fields: LenderFieldConfigExtended;
}

export type LenderFormConfig = LenderGetResponse | LenderGetResponseExtended;


export interface LenderPostResponse {
  decision: 'accepted' | 'declined';
}

export interface FormikFormConfig {
  fields: Array<LenderField>;
  initialValues: any;
  validationSchema: any;
}
