import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { SketchPicker } from 'react-color';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import randomColor from '../Services/randomColor';
import { FaPlus, FaTrashAlt, FaEdit, FaPencilAlt } from 'react-icons/fa';

class ColorListEditor extends Component {
  state = {
    show: false,
    index: 0,
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  showModal = (index) => {
    this.setState({ show: true, index });
  };

  setColor = (color) => {
    let oldList = this.props.list.slice(0);
    oldList[this.state.index] = color.hex;
    this.props.onChange(oldList);
  };

  addColor = () => {
    let newIndex = this.props.list.length;
    let oldList = this.props.list.slice(0);
    oldList.push(randomColor());
    this.props.onChange(oldList);
    this.showModal(newIndex);
  };

  deleteColor = (index) => {
    let oldList = this.props.list.slice(0);
    oldList.splice(index, 1);
    this.props.onChange(oldList);
  };

  render() {
    const cantAdd = this.props.list.length >= this.props.limits.max;
    const cantDelete = this.props.list.length <= this.props.limits.min;
    return (
      <>
        <Table striped hover size="sm">
          {this.props.list.map((color, index) => (
            <tr>
              <td style={{ width: '99%' }}>Colour {color}</td>
              <td>
                <ButtonGroup>
                  <Button
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      this.showModal(index);
                    }}
                  >
                    <FaPencilAlt />
                  </Button>
                  <Button
                    onClick={() => {
                      this.deleteColor(index);
                    }}
                    disabled={cantDelete}
                    variant="danger"
                  >
                    <FaTrashAlt />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </Table>
        <Button onClick={this.addColor} disabled={cantAdd}>
          <FaPlus />
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="modal-250px"
        >
          <Modal.Body>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SketchPicker
                color={this.props.list[this.state.index]}
                onChange={this.setColor}
                disableAlpha={true}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Save</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ColorListEditor;
