export default ({ art }) => (
  <li>
    <table>
      <tbody>
        <tr>
          <td>
            <img src={art.image_uri}></img>
          </td>
          <td>{art.name}</td>
          <td>{art.desc}</td>

          <td>{art.buy_price}</td>
          <td>{art.sell_price}</td>
        </tr>
      </tbody>
    </table>
  </li>
);
