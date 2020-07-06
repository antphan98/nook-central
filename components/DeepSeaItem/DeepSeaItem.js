import { Table } from 'semantic-ui-react';
import fetch from 'node-fetch';

export default (props) => {
  const { deepseas, isSavedToProgress, handleSelect } = props;
  return (
    <>
      <Table.Row
        className={isSavedToProgress ? 'is-saved' : null}
        onClick={async () => {
          const response = await fetch('/api/user-progress');
          const userProgress = await response.json();
          let requestBody;
          if (userProgress.data && userProgress.data.deepsea) {
            let deepSeaMatch = false;
            userProgress.data.deepsea.map((deepSeaName) => {
              if (deepSeaName === deepseas.name) {
                deepSeaMatch = true;
              }
            });
            if (deepSeaMatch) {
              const filteredDeepSea = userProgress.data.deepsea.filter(
                (deepSeaName) => {
                  return deepSeaName !== deepseas.name;
                }
              );
              requestBody = { deepsea: filteredDeepSea };
            } else {
              requestBody = {
                deepsea: [...userProgress.data.deepsea, deepseas.name],
              };
            }
          } else {
            requestBody = { deepsea: [deepseas.name] };
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
          <img width="70" src={deepseas.wikiImageUrl}></img>
        </Table.Cell>
        <Table.Cell>{deepseas.name}</Table.Cell>
        <Table.Cell>{deepseas.time}</Table.Cell>
        <Table.Cell>{deepseas.shadowSize}</Table.Cell>

        <Table.Cell>{deepseas.shadowMovement}</Table.Cell>
        <Table.Cell>
          {' '}
          <img width="20" src="images/bells-icon.png"></img>
          {deepseas.price}
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
        }
      `}</style>
    </>
  );
};
