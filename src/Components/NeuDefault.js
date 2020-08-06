import React, { Component } from 'react';
import TabMenu from './TabMenu';
import TabContent from './TabContent';
import Tab from 'react-bootstrap/Tab';

class NeuDefault extends Component {
  render() {
    return (
      <Tab.Container id="main_container" defaultActiveKey="general">
        <TabMenu />
        <TabContent />
      </Tab.Container>
    );
  }
}
export default NeuDefault;
