import React, { Component, useState } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import SigninModal from '../../components/SigninModal/SigninModal';

export default class MenuExampleSecondary extends Component {
  render() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    return (
      <Menu secondary>
        <Menu.Item name="home" onClick={this.handleItemClick} href="/" />
        <Dropdown text="Collectibles" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Header>Museum Donations</Dropdown.Header>
            <Dropdown.Item href="/art">Art</Dropdown.Item>
            <Dropdown.Item href="/bugs">Bugs</Dropdown.Item>
            <Dropdown.Item href="/fish">Fish</Dropdown.Item>
            <Dropdown.Item href="/fossils">Fossils</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item
          name="characters"
          onClick={this.handleItemClick}
          href="/characters"
        />
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
            <SigninModal />
          </Menu.Item>
          <Menu.Item name="sign up" onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}
