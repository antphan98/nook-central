export default ({ art }) => (
  <li>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Forgery</th>
          <th>Description</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{art.name}</td>
          <td>{art.hasForgery}</td>
          <td>{art.desc}</td>
          <td>
            <img src={art.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
);
