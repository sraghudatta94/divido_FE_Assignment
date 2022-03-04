import { API_URL } from 'lib/config';

export const Api = {
  // GET methods
  // get field definitions for the given bank
  getFormDefinitionForBank: (bankName: string) => {
    return fetch(`${API_URL}/api/lenders/${bankName}`);
  },

  // POST methods
  // send request for validating user details
  submitApplicantFormToBank: (bankName: string, userData: any) => {
    return fetch(`${API_URL}/api/lenders/${bankName}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },
};
