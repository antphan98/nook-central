import { misc } from "../../../../data/diys/misc";

export default ({ query: { id } }, res) => {
  const filtered = misc.filter(
    (p) => p.name.toLowerCase() === id.toLowerCase()
  );

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res
      .status(404)
      .json({ message: `Miscellaneous with name: ${id} not found.` });
  }
};
