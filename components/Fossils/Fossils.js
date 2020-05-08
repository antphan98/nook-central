export default ({ fossils }) => (
  <li>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{fossils.name}</td>
          <td>{fossils.price}</td>
          <td>
            <img src={fossils.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
