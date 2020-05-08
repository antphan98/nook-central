import { houseware } from '../../../data/diys/houseware';

export default (req, res) => {
  res.status(200).json(houseware);
};
