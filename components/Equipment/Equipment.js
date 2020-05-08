import Link from "next/link";

export default ({ equipment }) => (
  <li>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Materials</th>
          <th>Obtained From</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{equipment.name}</td>
          <td>{equipment.materials}</td>
          <td>{equipment.obtainedFrom}</td>
          <td>
            <img src={equipment.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
