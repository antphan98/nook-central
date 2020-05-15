import { Table, Container } from 'semantic-ui-react';

export default ({ fish }) => (
  <Container>
    <Table fixed>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{fish.name}</Table.Cell>
          <Table.Cell>
            <img width="50" src={fish.imageLink}></img>
          </Table.Cell>
          <Table.Cell>{fish.time}</Table.Cell>
          <Table.Cell>{fish.location}</Table.Cell>
          <Table.Cell>{fish.price}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);
