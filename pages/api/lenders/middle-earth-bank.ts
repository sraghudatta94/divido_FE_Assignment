import { NextApiRequest, NextApiResponse } from 'next';

import { LenderGetResponse, LenderPostResponse } from 'lib/types';

export const middleEarthBankData: LenderGetResponse = {
  name: 'Middle Earth Bank',
  fields: ['first_name', 'email', 'date_of_birth', 'monthly_income'],
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<LenderGetResponse | LenderPostResponse>,
): void => {
  if (req.method === 'POST') {
    // to get post data
    // console.log(req.body)
    const decision = Math.random() > 0.3 ? 'accepted' : 'declined';
    // to mimic server latency
    setTimeout(() => {
      res.status(200).json({ decision });
    }, 1000);
  } else {
    res.status(200).json(middleEarthBankData);
  }
};

export default handler;
