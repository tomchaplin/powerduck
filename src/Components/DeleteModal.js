import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class DeleteModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>Are you sure want to delete {this.props.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={this.props.onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default DeleteModal;
