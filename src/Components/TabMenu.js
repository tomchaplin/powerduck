import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

class TabMenu extends Component {
  render() {
    return (
      <Nav justify variant="tabs" defaultActiveKey="general">
        <Nav.Item>
          <Nav.Link eventKey="general">General</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="lighting">Lighting</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="cooling">Cooling</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="triggers">Triggers</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
export default TabMenu;
