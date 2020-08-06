import React, { Component } from 'react';
import getDb from '../Services/db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class GeneralView extends Component {
  constructor() {
    super();
    this.state = {
      general: {
        defaults: { lighting: '', cooling: '' },
      },
      profiles: {
        lighting: [],
        cooling: [],
      },
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    getDb.then((db) => {
      // Get in the list of the profiles
      let profiles = {};
      ['lighting', 'cooling'].forEach((type) => {
        profiles[type] = db
          .get(`profiles.${type}`)
          .value()
          .map((profile) => {
            return {
              id: profile.id,
              name: profile.name,
            };
          });
      });
      this.setState({
        general: db.get('general').value(),
        profiles,
      });
    });
  };

  changeDefault = (newId, type) => {
    let newDefaults = {
      ...this.state.general.defaults,
      [type]: newId,
    };
    getDb.then((db) => {
      db.get('general')
        .assign({
          ...this.state.general,
          defaults: newDefaults,
        })
        .write()
        .then(this.refresh);
    });
  };

  render() {
    const { lighting, cooling } = this.state.profiles;
    const { defaults } = this.state.general;
    return (
      <>
        <h1>Defaults</h1>
        <Form>
          <Form.Group as={Row} controlId="formDeviceMode">
            <Form.Label column sm={2}>
              Lighting
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={defaults.lighting}
                onChange={(event) => {
                  this.changeDefault(event.target.value, 'lighting');
                }}
              >
                <option value="">None</option>
                {lighting.map((profile) => (
                  <option value={profile.id}>{profile.name}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formDeviceMode">
            <Form.Label column sm={2}>
              Cooling
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={defaults.cooling}
                onChange={(event) => {
                  this.changeDefault(event.target.value, 'cooling');
                }}
              >
                <option value="">None</option>
                {cooling.map((profile) => (
                  <option value={profile.id}>{profile.name}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  }
}
export default GeneralView;
