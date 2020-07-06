import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import fetch from 'node-fetch';

export default (props) => {
  const { arts, isSavedToProgress, handleSelect } = props;
  return (
    <>
      <Table.Row
        className={isSavedToProgress ? 'is-saved' : null}
        onClick={async () => {
          const response = await fetch('/api/user-progress');
          const userProgress = await response.json();
          let requestBody;
          if (userProgress.data && userProgress.data.art) {
            let artMatch = false;
            userProgress.data.art.map((artName) => {
              if (artName === arts.name) {
                artMatch = true;
              }
            });
            if (artMatch) {
              const filteredArt = userProgress.data.art.filter((artName) => {
                return artName !== arts.name;
              });
              requestBody = { art: filteredArt };
            } else {
              requestBody = { art: [...userProgress.data.art, arts.name] };
            }
          } else {
            requestBody = { art: [arts.name] };
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
          <img src={arts.image_uri}></img>
        </Table.Cell>
        <Table.Cell>{_.startCase(_.toLower(arts.name))}</Table.Cell>
        <Table.Cell>{arts.desc}</Table.Cell>

        <Table.Cell>
          {' '}
          <img width="20" src="images/bells-icon.png"></img>
          &nbsp;{arts.buy_price}
        </Table.Cell>
      </Table.Row>
      <style jsx global>{`
        tr:hover {
          background-color: beige;
        }

        .is-saved {
          background-image: url(images/wood.jpg);
        }

        tr {
          -moz-transition: all 0.3s ease-in;
          -o-transition: all 0.3s ease-in;
          -webkit-transition: all 0.3s ease-in;
          transition: all 0.3s ease-in;
        }

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
};
