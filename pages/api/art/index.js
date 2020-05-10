import { art } from '../../../data/art';

export default (req, res) => {
  res.status(200).json(art);
};
