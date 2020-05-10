export default ({ others }) => (
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
          <td>{others.name}</td>
          <td>{others.materials}</td>
          <td>{others.obtainedFrom}</td>
          <td>
            <img src={others.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
