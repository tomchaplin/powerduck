import React, { Component } from 'react';
import { FaRocket, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import changeActiveProfiles from '../Services/changeActiveProfiles';

class ProfileButtons extends Component {
  activateProfile = () => {
    changeActiveProfiles({ [this.props.type]: this.props.profileId }).then(
      () => {
        this.props.refresh();
      }
    );
  };

  render() {
    return (
      <ButtonGroup>
        <Button onClick={this.activateProfile}>
          <FaRocket />
        </Button>
        <Button onClick={this.props.edit}>
          <FaPencilAlt />
        </Button>
        <Button onClick={this.props.delete}>
          <FaTrashAlt />
        </Button>
      </ButtonGroup>
    );
  }
}
export default ProfileButtons;
