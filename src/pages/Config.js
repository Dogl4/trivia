import React, { Component } from 'react';
import Header from '../components/Header';

class Config extends Component {
  render() {
    return (
      <div>
        <Header />
        <h4 data-testid="settings-title">Configurações</h4>
      </div>
    );
  }
}

export default Config;
