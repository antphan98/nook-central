import { Table } from 'semantic-ui-react';
import fetch from 'node-fetch';

export default (props) => {
  const { fishies, isSavedToProgress, handleSelect } = props;
  console.log(fishies);

  return (
    <>
      <Table.Row
        className={isSavedToProgress ? 'is-saved' : null}
        onClick={async () => {
          console.log(fishies);
          const response = await fetch('/api/user-progress');
          const userProgress = await response.json();
          let requestBody;
          if (userProgress.data && userProgress.data.fish) {
            let fishMatch = false;
            userProgress.data.fish.map((fishName) => {
              if (fishName === fishies.name) {
                fishMatch = true;
              }
            });
            if (fishMatch) {
              const filteredFish = userProgress.data.fish.filter((fishName) => {
                return fishName !== fishies.name;
              });
              requestBody = { fish: filteredFish };
            } else {
              requestBody = { fish: [...userProgress.data.fish, fishies.name] };
            }
          } else {
            requestBody = { fish: [fishies.name] };
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
        <Table.Cell>{fishies.name}</Table.Cell>
        <Table.Cell>
          <img width="50" src={fishies.imageLink}></img>
        </Table.Cell>
        <Table.Cell>{fishies.time}</Table.Cell>
        <Table.Cell>{fishies.location}</Table.Cell>
        <Table.Cell>{fishies.shadowSize}</Table.Cell>

        <Table.Cell>{fishies.price}</Table.Cell>
      </Table.Row>
      <style jsx global>{`
        tr:hover {
          background-color: beige;
        }

        .is-saved {
          background-color: pink;
        }
      `}</style>
    </>
  );
};
