import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import fetch from 'node-fetch';
import { get } from 'lodash/object';
import PropTypes from 'prop-types';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';

const DiyItem = (props) => {
  const { diys, isSavedToProgress, handleSelect, AuthUserInfo } = props;
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

const mockFetchData = async (userId) => ({
  user: {
    ...(userId && {
      id: userId,
    }),
  },
});

DiyItem.getInitialProps = async (ctx) => {
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

DiyItem.displayName = 'DiyItem';

DiyItem.propTypes = {
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

DiyItem.defaultProps = {
  AuthUserInfo: null,
};

export default withAuthUser(withAuthUserInfo(DiyItem));
