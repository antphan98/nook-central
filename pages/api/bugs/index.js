import { bugs } from '../../../data/bugs';

export default (req, res) => {
  res.status(200).json(bugs)
}