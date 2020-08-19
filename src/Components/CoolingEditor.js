import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FaRocket } from 'react-icons/fa';
const devices = require('../data/devices');
import getDb from '../Services/db';
import changeActiveProfiles from '../Services/changeActiveProfiles';
import CoolingCurveEditor from './CoolingCurveEditor';

const minSpeed = 20;

class CoolingEditor extends Component {
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

  getProfile = (id) => {
    getDb.then((db) => {
      let profile = db.get('profiles.cooling').find({ id: id }).value();
      profile = this.initializeProfile(profile);
      this.setState(profile);
    });
  };

  initializeProfile = (profile) => {
    if (!profile.curve) {
      profile.curve = [
        [30, minSpeed],
        [70, 100],
      ];
    }
    if (!profile.snippets) {
      profile.snippets = devices.cooling.map((device) => device.snippet);
    }
    return profile;
  };

  activateProfile = () => {
    changeActiveProfiles({ cooling: this.props.profileId }).then(() => {
      this.props.refresh();
    });
  };

  saveProfile = () => {
    return getDb.then((db) => {
      return db
        .get('profiles.cooling')
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
            <CoolingCurveEditor
              curve={this.state.curve}
              onChange={(curve) => {
                this.setState({ curve });
              }}
            />
          </Form>
        </div>
      </Container>
    );
  }
}
export default CoolingEditor;
