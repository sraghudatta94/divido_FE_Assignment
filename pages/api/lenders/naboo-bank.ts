import { NextApiRequest, NextApiResponse } from 'next';

import {
  FieldTypes,
  LenderGetResponseExtended,
  LenderPostResponse,
} from 'lib/types';

export const nabooBankData: LenderGetResponseExtended = {
  name: 'Naboo Bank',
  fields: [
    { name: 'first_name', type: FieldTypes.TEXT, required: true },
    { name: 'last_name', type: FieldTypes.TEXT, required: true },
    {
      name: 'gender',
      type: FieldTypes.SELECT,
      required: true,
      options: ['Female', 'Male', 'Other'],
    },
    { name: 'contractor', type: FieldTypes.CHECKBOX, required: false },
  ],
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<LenderGetResponseExtended | LenderPostResponse>,
): void => {
  
  if (req.method === 'POST') {
    // to get post data
    // console.log(req.body)
    const decision = Math.random() > 0.5 ? 'accepted' : 'declined';
    // to mimic server latency
    setTimeout(() => {
      res.status(200).json({ decision });
    }, 1000);
  } else {
    res.status(200).json(nabooBankData);
  }
};

export default handler;
