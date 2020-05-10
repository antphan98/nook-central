import { tools } from '../../../data/diys/tools';

export default (req, res) => {
  res.status(200).json(tools);
};
