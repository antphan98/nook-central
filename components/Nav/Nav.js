import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import withAuthUser from '../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../utils/pageWrappers/withAuthUserInfo';
import logout from '../../utils/auth/logout';
import Router from 'next/router';

const Nav = (props) => {
  const { AuthUserInfo } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  return (
    <Menu secondary>
      <Menu.Item name="home" href="/" />
      <Dropdown text="Collectibles" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Header>Museum Donations</Dropdown.Header>
          <Dropdown.Item href="/art">Art</Dropdown.Item>
          <Dropdown.Item href="/bugs">Bugs</Dropdown.Item>
          <Dropdown.Item href="/fish">Fish</Dropdown.Item>
          <Dropdown.Item href="/fossils">Fossils</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Item name="characters" href="/characters" />
      <Dropdown text="DIY Recipies" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Header>Categories</Dropdown.Header>
          <Dropdown.Item href="/equipment">Equipment</Dropdown.Item>
          <Dropdown.Item href="/houseware">Houseware</Dropdown.Item>
          <Dropdown.Item href="/misc">Miscellaneous</Dropdown.Item>
          <Dropdown.Item href="/others">Others</Dropdown.Item>
          <Dropdown.Item href="/tools">Tools</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position="right">
        <Menu.Item>
          <div>
            <p>Hi there!</p>
            {!AuthUser ? (
              <p>
                You are not signed in.{' '}
                <Button href={'/auth'}>Sign In/Up</Button>
              </p>
            ) : (
              <div>
                <p>You signed in. Email: {AuthUser.email}</p>
                <Button
                  onClick={async () => {
                    try {
                      await logout();
                      Router.push('/');
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  Log out
                </Button>
              </div>
            )}
          </div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

const mockFetchData = async (userId) => ({
  user: {
    ...(userId && {
      id: userId,
    }),
  },
});

Nav.getInitialProps = async (ctx) => {
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

Nav.displayName = 'Nav';

Nav.propTypes = {
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

Nav.defaultProps = {
  AuthUserInfo: null,
};

export default withAuthUser(withAuthUserInfo(Nav));
