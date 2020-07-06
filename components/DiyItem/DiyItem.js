import { Table } from 'semantic-ui-react';
import _ from 'lodash';

export default ({ diy }) => (
  <>
    <Table.Row>
      <Table.Cell>
        <img width="90" src={diy.Item_Image}></img>
      </Table.Cell>
      <Table.Cell>{_.startCase(_.toLower(diy.Name))}</Table.Cell>
      <Table.Cell className="materials">
        <div className="material1">
          {diy.Material_1_count} {diy.Material_1}
        </div>
        <div className="material2">
          {diy.Material_2_count} {diy.Material_2}
        </div>

        <div className="material3">
          {diy.Material_3_count} {diy.Material_3}
        </div>

        <div className="material4">
          {diy.Material_4_count} {diy.Material_4}
        </div>
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
      }

      .material1,
      .material2,
      .material3,
      .material4 {
        display: flex;
        flex-direction: column;
      }
    `}</style>
  </>
);
