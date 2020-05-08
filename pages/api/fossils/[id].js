import { fossils } from '../../../data/fossils'

export default ({ query: { id } }, res) => {
  const filtered = fossils.filter(p => p.name.toLowerCase() === id.toLowerCase())

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Fossils with name: ${id} not found.` })
  }
}