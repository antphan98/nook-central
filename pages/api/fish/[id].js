import { fish } from '../../../data/fish'

export default ({ query: { id } }, res) => {
  const filtered = fish.filter(p => p.name.toLowerCase() === id.toLowerCase())

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Fish with name: ${id} not found.` })
  }
}