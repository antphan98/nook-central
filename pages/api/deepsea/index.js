import { deepsea } from '../../../data/deepsea';

export default (req, res) => {
  res.status(200).json(deepsea);
};
