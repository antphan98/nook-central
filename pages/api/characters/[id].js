import { characters } from '../../../data/characters'

export default ({ query: { id } }, res) => {
  const filtered = characters.filter(p => p.name.toLowerCase() === id.toLowerCase())

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Character with name: ${id} not found.` })
  }
}