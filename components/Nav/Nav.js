import React, { Component } from 'react'
import { Input, Menu, Dropdown } from 'semantic-ui-react'

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      
      
      <Menu secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          href="/"
        />
        <Dropdown text='Collectibles' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Header>Museum Donations</Dropdown.Header>
        <Dropdown.Item href="/art">Art</Dropdown.Item>
              <Dropdown.Item href="/bugs">Bugs</Dropdown.Item>
              <Dropdown.Item href="/fish">Fish</Dropdown.Item>
              <Dropdown.Item href="/fossils">Fossils</Dropdown.Item>

            </Dropdown.Menu>
    </Dropdown>

        <Menu.Item
          name='characters'
          active={activeItem === 'characters'}
          onClick={this.handleItemClick}
          href="/characters"
        />
        <Dropdown text='DIY Recipies' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Header>Categories</Dropdown.Header>
        <Dropdown.Item href="/equipment">Equipment</Dropdown.Item>
              <Dropdown.Item href="/houseware">Houseware</Dropdown.Item>
              <Dropdown.Item href="/fish">Fish</Dropdown.Item>
              <Dropdown.Item href="/fossils">Fossils</Dropdown.Item>

            </Dropdown.Menu>
    </Dropdown>
        <Menu.Menu position='right'>
          <Menu.Item
          name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
            />
          <Menu.Item
            name='sign up'
            active={activeItem === 'sign up'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}