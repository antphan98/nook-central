import { equipment } from '../../../data/diys/equipment';

export default ({ query: { id } }, res) => {
  const filtered = equipment.filter(
    (p) => p.name.toLowerCase() === id.toLowerCase()
  );

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Equipment with name: ${id} not found.` });
  }
};
