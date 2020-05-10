import { art } from '../../../data/art';

export default ({ query: { id } }, res) => {
  const filtered = art.filter((p) => p.name.toLowerCase() === id.toLowerCase());

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Art with name: ${id} not found.` });
  }
};
