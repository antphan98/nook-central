export default ({ bugs }) => (
  <li>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Location</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{bugs.name}</td>
          <td>{bugs.price}</td>
          <td>{bugs.location}</td>
          <td>
            <img src={bugs.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
