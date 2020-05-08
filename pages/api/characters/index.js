import { characters } from '../../../data/characters';

export default (req, res) => {
  res.status(200).json(characters)
}