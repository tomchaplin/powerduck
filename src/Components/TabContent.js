import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';

import defaultConfig from '../Services/defaultConfig';
import GeneralView from './GeneralView';
import ProfileView from './ProfileView';
import TriggersView from './TriggersView';

class TabContent extends Component {
  constructor() {
    super();
    this.state = defaultConfig;
  }

  render() {
    return (
      <Container fluid>
        <div className="pt-3">
          <Tab.Content>
            <Tab.Pane eventKey="general" unmountOnExit={true}>
              <GeneralView />
            </Tab.Pane>
            <Tab.Pane eventKey="lighting" unmountOnExit={true}>
              <ProfileView type="lighting" />
            </Tab.Pane>
            <Tab.Pane eventKey="cooling" unmountOnExit={true}>
              <ProfileView type="cooling" />
            </Tab.Pane>
            <Tab.Pane eventKey="triggers" unmountOnExit={true}>
              <TriggersView />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Container>
    );
  }
}
export default TabContent;
