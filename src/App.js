import React, { Component } from 'react';
import './App.scss';
import NeuDefault from './Components/NeuDefault';

class reactComponents extends Component {
  render() {
    return (
      <div>
        <div id="neuDefault">
          <NeuDefault />
        </div>
      </div>
    );
  }
}

export default reactComponents;
