import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import fetch from 'node-fetch';

export default (props) => {
  const { diys, isSavedToProgress, handleSelect } = props;
  return (
    <>
      <Table.Row
        className={isSavedToProgress ? 'is-saved' : null}
        onClick={async () => {
          const response = await fetch('/api/user-progress');
          const userProgress = await response.json();
          let requestBody;
          if (userProgress.data && userProgress.data.diy) {
            let diyMatch = false;
            userProgress.data.diy.map((diyName) => {
              if (diyName === diys.Name) {
                diyMatch = true;
              }
            });
            if (diyMatch) {
              const filteredDiy = userProgress.data.diy.filter((diyName) => {
                return diyName !== diys.Name;
              });
              requestBody = { diy: filteredDiy };
            } else {
              requestBody = { diy: [...userProgress.data.diy, diys.Name] };
            }
          } else {
            requestBody = { diy: [diys.Name] };
          }
          console.log(requestBody);
          fetch('/api/user-progress', {
            method: 'POST',
            body: JSON.stringify(requestBody),
          })
            .then((res) => res.json())
            .then(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );
          handleSelect(requestBody);
        }}
      >
        <Table.Cell>
          <img width="90" src={diys.Item_Image}></img>
        </Table.Cell>
        <Table.Cell>{_.startCase(_.toLower(diys.Name))}</Table.Cell>
        <Table.Cell className="materials">
          <div className="material1">
            {diys.Material_1_count} {diys.Material_1}
          </div>
          <div className="material2">
            {diys.Material_2_count} {diys.Material_2}
          </div>

          <div className="material3">
            {diys.Material_3_count} {diys.Material_3}
          </div>

          <div className="material4">
            {diys.Material_4_count} {diys.Material_4}
          </div>
        </Table.Cell>

        <Table.Cell>{diys.Category}</Table.Cell>
      </Table.Row>

      <style jsx global>{`
        .ui.table tr td,
        .ui.table {
          border-top: none;
          border: none;
        }
        tr:hover {
          background-color: beige;
        }

        .is-saved {
          background-image: url(images/wood.jpg);
        }

        .ui.table {
          border-radius: 20px;
        }

        tr {
          -moz-transition: all 0.3s ease-in;
          -o-transition: all 0.3s ease-in;
          -webkit-transition: all 0.3s ease-in;
          transition: all 0.3s ease-in;
        }

        .material1,
        .material2,
        .material3,
        .material4 {
          display: flex;
          flex-direction: column;
        }

        @media only screen and (max-width: 768px) {
          .ui.table tr {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};
