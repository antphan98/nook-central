import { others } from "../../../../data/diys/others";

export default ({ query: { id } }, res) => {
  const filtered = others.filter(
    (p) => p.name.toLowerCase() === id.toLowerCase()
  );

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Others with name: ${id} not found.` });
  }
};
