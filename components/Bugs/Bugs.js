import { Table, Container } from 'semantic-ui-react';

export default ({ bugs }) => (
  <Container>
    <Table fixed>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{bugs.name}</Table.Cell>
          <Table.Cell>
            <img width="50" src={bugs.imageLink}></img>
          </Table.Cell>
          <Table.Cell>{bugs.time}</Table.Cell>
          <Table.Cell>{bugs.location}</Table.Cell>
          <Table.Cell>{bugs.price}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);
