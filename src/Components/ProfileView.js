import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import getDb from '../Services/db';
import getActiveProfiles from '../Services/getActiveProfiles';
import ProfileButtons from './ProfileButtons';
import DeleteModal from './DeleteModal';
import LightingEditor from './LightingEditor';
import CoolingEditor from './CoolingEditor';
import { FaPlus } from 'react-icons/fa';
import { nanoid } from 'nanoid/non-secure';

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      viewing: {
        mode: 'table',
      },
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    getDb.then((db) => {
      this.setState({
        profiles: db.get(`profiles.${this.props.type}`).value(),
      });
    });
    getActiveProfiles().then((profiles) => {
      this.setState({ activeProfile: profiles[this.props.type] });
    });
  };

  switchView = (obj) => {
    this.setState({ viewing: obj });
  };

  closeModal = () => {
    this.switchView({ mode: 'table' });
  };

  deleteViewing = () => {
    getDb.then((db) => {
      db.get(`profiles.${this.props.type}`)
        .remove({ id: this.state.viewing.id })
        .write()
        .then(() => {
          this.closeModal();
          this.refresh();
        });
    });
  };

  newProfile = () => {
    getDb.then((db) => {
      db.get(`profiles.${this.props.type}`)
        .push({ id: nanoid(), name: 'New Profile', data: [] })
        .write()
        .then(this.refresh);
    });
  };

  render() {
    const { profiles, viewing, activeProfile } = this.state;
    let viewingProfile = {};
    if (viewing.id) {
      viewingProfile = profiles.find((item) => item.id === viewing.id);
    }
    if (viewing.mode === 'table' || viewing.mode == 'delete') {
      return (
        <>
          <Table striped bordered hover>
            <tbody>
              {profiles.map((profile) => {
                let rowClass =
                  profile.id === activeProfile ? 'table-primary' : '';
                return (
                  <tr className={rowClass}>
                    <th
                      style={{
                        width: '99%',
                      }}
                    >
                      {profile.name}
                    </th>
                    <td>
                      <ProfileButtons
                        profileId={profile.id}
                        edit={() => {
                          this.switchView({ mode: 'edit', id: profile.id });
                        }}
                        delete={() => {
                          this.switchView({ mode: 'delete', id: profile.id });
                        }}
                        refresh={this.refresh}
                        type={this.props.type}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button onClick={this.newProfile}>
            <FaPlus />
          </Button>
          <DeleteModal
            show={viewing.mode === 'delete'}
            name={viewingProfile.name}
            onHide={this.closeModal}
            onDelete={this.deleteViewing}
          />
        </>
      );
    } else if (viewing.mode === 'edit') {
      if (this.props.type === 'lighting') {
        return (
          <LightingEditor
            back={() => {
              this.switchView({ mode: 'table' });
            }}
            profileId={viewing.id}
            refresh={this.refresh}
          />
        );
      } else if (this.props.type === 'cooling') {
        return (
          <CoolingEditor
            back={() => {
              this.switchView({ mode: 'table' });
            }}
            profileId={viewing.id}
          />
        );
      }
    }
  }
}
export default ProfileView;
