import { Container, Table } from 'semantic-ui-react';

export default ({ fossils }) => (
  <Container>
    <Table fixed>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{fossils.name}</Table.Cell>
          <Table.Cell>
            <img width="50" src={fossils.imageLink}></img>
          </Table.Cell>
          <Table.Cell>{fossils.price}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);
