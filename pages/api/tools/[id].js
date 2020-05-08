import { tools } from "../../../../data/diys/tools";

export default ({ query: { id } }, res) => {
  const filtered = tools.filter(
    (p) => p.name.toLowerCase() === id.toLowerCase()
  );

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Tools with name: ${id} not found.` });
  }
};
