export default ({ tools }) => (
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
          <td>{tools.name}</td>
          <td>{tools.materials}</td>
          <td>{tools.obtainedFrom}</td>
          <td>
            <img src={tools.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
