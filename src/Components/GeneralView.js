import React, { Component } from 'react';
import getDb from '../Services/db';
import Button from 'react-bootstrap/Button';

class GeneralView extends Component {
  constructor() {
    super();
    this.state = {
      general: {},
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    getDb.then((db) => {
      this.setState({
        general: db.get('general').value(),
      });
    });
  };

  addKey = () => {
    this.setState({ general: { new: 1 } });
    getDb.then((db) => {
      db.get('general')
        .assign(this.state.general)
        .write()
        .then(() => this.refresh());
    });
  };

  render() {
    return (
      <>
        <span>{JSON.stringify(this.state.general)}</span>
        <Button onClick={this.addKey}>Add key</Button>
      </>
    );
  }
}
export default GeneralView;
