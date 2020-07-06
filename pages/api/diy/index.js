import { diy } from '../../../data/diy';

export default (req, res) => {
  res.status(200).json(diy);
};
