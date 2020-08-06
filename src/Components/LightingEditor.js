import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import LightingDeviceEditor from './LightingDeviceEditor';
import { FaRocket } from 'react-icons/fa';
const devices = require('../data/devices');
import getDb from '../Services/db';
import changeActiveProfiles from '../Services/changeActiveProfiles';

class LightingEditor extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getProfile(this.props.profileId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileId !== nextProps.profileId) {
      this.getProfile(nextProps.profileId);
    }
  }

  activateProfile = () => {
    changeActiveProfiles({ lighting: this.props.profileId }).then(() => {
      this.props.refresh();
    });
  };

  getProfile = (id) => {
    getDb.then((db) => {
      let profile = db.get('profiles.lighting').find({ id: id }).value();
      profile = this.initializeProfile(profile);
      this.setState(profile);
    });
  };

  initializeProfile = (profile) => {
    if (!profile.data) {
      profile.data = [];
    }
    if (profile.data.length < devices.lighting.length) {
      devices.lighting.forEach((device) => {
        let datumIndex = profile.data.findIndex(
          (datum) => datum.id === device.id
        );
        if (datumIndex === -1) {
          // This device is not intialized on this profile so we must add it
          profile.data.push({
            id: device.id,
            snippet: device.snippet,
            mode: 'off',
            colors: [],
          });
        }
      });
    }
    return profile;
  };

  saveProfile = () => {
    return getDb.then((db) => {
      return db
        .get('profiles.lighting')
        .find({ id: this.props.profileId })
        .assign(this.state)
        .write();
    });
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-between">
          <Button variant="secondary" onClick={this.props.back}>
            Back
          </Button>
          <span>ID: {this.props.profileId}</span>
          <ButtonGroup>
            <Button
              variant="warning"
              onClick={() => {
                this.saveProfile().then(this.activateProfile);
              }}
            >
              <FaRocket />
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.saveProfile().then(this.props.back);
              }}
            >
              Save
            </Button>
          </ButtonGroup>
        </Row>
        <div className="pt-3">
          <Form>
            <Form.Group as={Row} controlId="formProfileName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={this.state.name}
                  onChange={(event) => {
                    this.setState({
                      name: event.target.value,
                    });
                  }}
                />
              </Col>
            </Form.Group>
            <Accordion>
              {devices.lighting.map((device, index) => (
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                    {device.name}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body>
                      <LightingDeviceEditor
                        device={device}
                        data={this.state.data.find(
                          (datum) => datum.id === device.id
                        )}
                        changeData={(newData) => {
                          console.log(newData);
                          let oldData = this.state.data;
                          let indexToChange = oldData.findIndex(
                            (datum) => datum.id === device.id
                          );
                          oldData[indexToChange] = newData;
                          this.setState({ data: oldData });
                        }}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </Form>
        </div>
      </Container>
    );
  }
}
export default LightingEditor;
