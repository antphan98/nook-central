import { others } from "../../../../data/diys/others";

export default (req, res) => {
  res.status(200).json(others);
};
