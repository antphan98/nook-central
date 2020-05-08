import { bugs } from '../../../data/bugs'

export default ({ query: { id } }, res) => {
  const filtered = bugs.filter(p => p.name.toLowerCase() === id.toLowerCase())

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Bug with name: ${id} not found.` })
  }
}