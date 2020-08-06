import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ColorListEditor from './ColorListEditor';
import randomColor from '../Services/randomColor';

class LightingDeviceEditor extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'off',
    };
  }

  changeMode = (newMode) => {
    // First we find the mode within the device data
    const newModeData = this.props.device.modes.find(
      (mode) => mode.name === newMode
    );
    // Now we ensure that the colour array is within the limits
    let newColors = this.props.data.colors;
    if (newColors.length > newModeData.limits.max) {
      newColors = newColors.slice(0, newModeData.limits.max);
    } else if (newColors.length < newModeData.limits.min) {
      let numToAdd = newModeData.limits.min - newColors.length;
      newColors = [...newColors, ...[...Array(numToAdd)].map(randomColor)];
    }
    // Now we change the data
    this.props.changeData({
      ...this.props.data,
      mode: newMode,
      colors: newColors,
    });
  };

  render() {
    return typeof this.props.data == 'undefined' ? (
      <></>
    ) : (
      <Form>
        <Form.Group as={Row} controlId="formDeviceMode">
          <Form.Label column sm={2}>
            Mode
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={this.props.data.mode}
              onChange={(event) => {
                this.changeMode(event.target.value);
              }}
            >
              {this.props.device.modes.map((mode) => (
                <option value={mode.name}>{mode.name}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <ColorListEditor
          list={this.props.data.colors}
          onChange={(newList) => {
            console.log(newList);
            this.props.changeData({
              ...this.props.data,
              colors: newList,
            });
          }}
          limits={
            this.props.device.modes.find(
              (mode) => mode.name === this.props.data.mode
            ).limits
          }
        />
      </Form>
    );
  }
}
export default LightingDeviceEditor;
