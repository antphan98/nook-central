import { Table, Container } from 'semantic-ui-react';

export default ({ art }) => (
  <Container>
    <Table fixed>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <img src={art.image_uri}></img>
          </Table.Cell>
          <Table.Cell>{art.name}</Table.Cell>
          <Table.Cell>{art.desc}</Table.Cell>

          <Table.Cell>{art.buy_price}</Table.Cell>
          <Table.Cell>{art.sell_price}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);
