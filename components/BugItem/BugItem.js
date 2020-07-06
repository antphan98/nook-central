import { Table } from 'semantic-ui-react';
import fetch from 'node-fetch';
import { get } from 'lodash/object';
import PropTypes from 'prop-types';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';

const BugItem = (props) => {
  const { bug, isSavedToProgress, handleSelect, AuthUserInfo } = props;
  console.log(bug);
  console.log(isSavedToProgress);

  return (
    <>
      <Table.Row
        className={isSavedToProgress ? 'is-saved' : null}
        onClick={async () => {
          const AuthUser = get(AuthUserInfo, 'AuthUser', null);
          {
            !AuthUser ? alert('Please sign in to start collecting!') : null;
          }

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
          handleSelect(requestBody);
        }}
      >
        <Table.Cell>
          <img width="70" src={bug.imageLink}></img>
        </Table.Cell>
        <Table.Cell>{bug.name}</Table.Cell>

        <Table.Cell>{bug.time}</Table.Cell>
        <Table.Cell>{bug.location}</Table.Cell>
        <Table.Cell>
          <img width="20" src="images/bells-icon.png"></img>
          &nbsp; {bug.price}
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

const mockFetchData = async (userId) => ({
  user: {
    ...(userId && {
      id: userId,
    }),
  },
});

BugItem.getInitialProps = async (ctx) => {
  // Get the AuthUserInfo object. This is set in `withAuthUser.js`.
  // The AuthUserInfo object is available on both the server and client.
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  // You can also get the token (e.g., to authorize a request when fetching data)
  // const AuthUserToken = get(AuthUserInfo, 'token', null)

  // You can fetch data here.
  const data = await mockFetchData(get(AuthUser, 'id'));

  return {
    data,
  };
};

BugItem.displayName = 'BugItem';

BugItem.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
};

BugItem.defaultProps = {
  AuthUserInfo: null,
};

export default withAuthUser(withAuthUserInfo(BugItem));
