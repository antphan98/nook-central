import { Container, Table } from 'semantic-ui-react';

export default ({ characters }) => (
  <Container>
    <Table fixed>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <img width="50" src={characters.imageLink}></img>
          </Table.Cell>
          <Table.Cell>{characters.name}</Table.Cell>
          <Table.Cell>{characters.species}</Table.Cell>
          <Table.Cell>{characters.personality}</Table.Cell>

          <Table.Cell>{characters.birthday}</Table.Cell>
          <Table.Cell>{characters.catchPhrase}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);
