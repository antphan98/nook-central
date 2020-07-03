import { Table } from 'semantic-ui-react';
import fetch from 'node-fetch';
import _ from 'lodash';

export default (props) => {
  const { fossil, isSavedToProgress, handleSelect } = props;
  return (
    <>
      <Table.Row
        className={isSavedToProgress ? 'is-saved' : null}
        onClick={async () => {
          const response = await fetch('/api/user-progress');
          const userProgress = await response.json();
          let requestBody;
          if (userProgress.data && userProgress.data.fossils) {
            let fossilMatch = false;
            userProgress.data.fossils.map((fossilName) => {
              if (fossilName === fossil.name) {
                fossilMatch = true;
              }
            });
            if (fossilMatch) {
              const filteredFossils = userProgress.data.fossils.filter(
                (fossilName) => {
                  return fossilName !== fossil.name;
                }
              );
              requestBody = { fossils: filteredFossils };
            } else {
              requestBody = {
                fossils: [...userProgress.data.fossils, fossil.name],
              };
            }
          } else {
            requestBody = { fossils: [fossil.name] };
          }

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
          <img width="80" src={fossil.imageLink}></img>
        </Table.Cell>
        <Table.Cell>{_.startCase(_.toLower(fossil.name))}</Table.Cell>

        <Table.Cell>
          {' '}
          <img width="20" src="images/bells-icon.png"></img>
          &nbsp; {fossil.price}
        </Table.Cell>
      </Table.Row>
      <style jsx global>{`
        tr:hover {
          background-color: beige;
        }

        .is-saved {
          background-image: url(images/wood.jpg);
        }
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
};
