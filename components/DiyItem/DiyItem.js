import { Table } from 'semantic-ui-react';

export default ({ diy }) => (
  <>
    <Table.Row>
      <Table.Cell>
        <img
          width="80"
          style={{ borderRadius: '50%' }}
          src={diy.imageLink}
        ></img>
      </Table.Cell>
      <Table.Cell>{diy.name}</Table.Cell>
      <Table.Cell>{diy.species}</Table.Cell>
      <Table.Cell>{diy.personality}</Table.Cell>

      <Table.Cell>{diy.birthday}</Table.Cell>
      <Table.Cell>{diy.catchPhrase}</Table.Cell>
    </Table.Row>

    <style jsx global>{`

 .ui.table tr td,
 .ui.table {
   border-top: none;
   border: none;
 }

 .ui.table {
   border-radius: 20px;
`}</style>
  </>
);
