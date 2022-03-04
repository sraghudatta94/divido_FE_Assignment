import { NextApiRequest, NextApiResponse } from 'next';

import { LenderGetResponse, LenderPostResponse } from 'lib/types';

export const bankOfAzerothData: LenderGetResponse = {
  name: 'Bank of Azeroth',
  fields: ['first_name', 'last_name', 'email', 'gender', 'monthly_income'],
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<LenderGetResponse | LenderPostResponse>,
): void => {
  if (req.method === 'POST') {
    // to get post data
    // console.log(req.body)
    const decision = Math.random() > 0.7 ? 'accepted' : 'declined';
    // to mimic server latency
    setTimeout(() => {
      res.status(200).json({ decision });
    }, 1000);
  } else {
    res.status(200).json(bankOfAzerothData);
  }
};

export default handler;
