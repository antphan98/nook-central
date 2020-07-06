import { diy } from '../../../data/diy';

export default ({ query: { id } }, res) => {
  const filtered = diy.filter((p) => p.name.toLowerCase() === id.toLowerCase());

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `DIY Recipe with name: ${id} not found.` });
  }
};
