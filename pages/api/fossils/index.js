import { fossils } from '../../../data/fossils';

export default (req, res) => {
  res.status(200).json(fossils)
}