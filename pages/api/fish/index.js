import { fish } from '../../../data/fish';

export default (req, res) => {
  res.status(200).json(fish)
}