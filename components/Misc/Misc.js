export default ({ misc }) => (
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
          <td>{misc.name}</td>
          <td>{misc.materials}</td>
          <td>{misc.obtainedFrom}</td>
          <td>
            <img src={misc.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
