import { equipment } from "../../../../data/diys/equipment";

export default (req, res) => {
  res.status(200).json(equipment);
};
