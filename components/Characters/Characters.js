import { Table } from 'semantic-ui-react';

export default ({ characters }) => (
  <>
    <Table.Row>
      <Table.Cell>
        <img
          width="80"
          style={{ borderRadius: '50%' }}
          src={characters.imageLink}
        ></img>
      </Table.Cell>
      <Table.Cell>{characters.name}</Table.Cell>
      <Table.Cell>{characters.species}</Table.Cell>
      <Table.Cell>{characters.personality}</Table.Cell>

      <Table.Cell>{characters.birthday}</Table.Cell>
      <Table.Cell>{characters.catchPhrase}</Table.Cell>
    </Table.Row>

    <style jsx global>{`
      .ui.table tr td,
      .ui.table {
        border-top: none;
        border: none;
      }

      .ui.table {
        border-radius: 20px;
      }
      @media only screen and (max-width: 768px) {
        .ui.table tr {
          text-align: center;
        }
      }
    `}</style>
  </>
);
