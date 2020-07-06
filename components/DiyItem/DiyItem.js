import { Table } from 'semantic-ui-react';
import _ from 'lodash';

export default ({ diy }) => (
  <>
    <Table.Row>
      <Table.Cell>
        <img width="90" src={diy.Item_Image}></img>
      </Table.Cell>
      <Table.Cell>{_.startCase(_.toLower(diy.Name))}</Table.Cell>
      <Table.Cell>
        {diy.Material_1_count} {diy.Material_1}
      </Table.Cell>
      <Table.Cell>
        {diy.Material_2_count} {diy.Material_2}
      </Table.Cell>

      <Table.Cell>
        {diy.Material_3_count} {diy.Material_3}
      </Table.Cell>
      <Table.Cell>
        {diy.Material_4_count} {diy.Material_4}
      </Table.Cell>
      <Table.Cell>{diy.Category}</Table.Cell>
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
