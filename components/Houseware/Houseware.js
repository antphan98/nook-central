export default ({ houseware }) => (
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
          <td>{houseware.name}</td>
          <td>{houseware.materials}</td>
          <td>{houseware.obtainedFrom}</td>
          <td>
            <img src={houseware.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
