import { Table } from 'semantic-ui-react';
import fetch from 'node-fetch';

export default ({ bug }) => (
  <Table.Row
    onClick={async () => {
      console.log(bug);
      const response = await fetch('/api/user-progress');
      const userProgress = await response.json();
      let requestBody;
      if (userProgress.data && userProgress.data.bugs) {
        let bugMatch = false;
        userProgress.data.bugs.map((bugName) => {
          if (bugName === bug.name) {
            bugMatch = true;
          }
        });
        if (bugMatch) {
          //remove existing bug
          const filteredBugs = userProgress.data.bugs.filter((bugName) => {
            return bugName !== bug.name;
          });
          // const filteredBugs = [];
          // userProgress.data.bugs.forEach(b => {
          //   if (b.name !== bug.name)
          //   filteredBugs.push(b)
          // })
          requestBody = { bugs: filteredBugs };
        } else {
          //add new bug
          requestBody = { bugs: [...userProgress.data.bugs, bug.name] };
        }
      } else {
        requestBody = { bugs: [bug.name] };
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
    }}
  >
    <Table.Cell>{bug.name}</Table.Cell>
    <Table.Cell>
      <img width="50" src={bug.imageLink}></img>
    </Table.Cell>
    <Table.Cell>{bug.time}</Table.Cell>
    <Table.Cell>{bug.location}</Table.Cell>
    <Table.Cell>
      <img width="20" src="images/bells-icon.png"></img>
      {bug.price}
    </Table.Cell>
  </Table.Row>
);
