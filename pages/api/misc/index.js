import { misc } from '../../../data/diys/misc';

export default (req, res) => {
  res.status(200).json(misc);
};
