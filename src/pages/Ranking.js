import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RankingPlayer extends Component {
  constructor(props) {
    super(props);
    this.sendToLogin = this.sendToLogin.bind(this);
  }

  sendToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div data-testid="ranking-title">
        Página de Ranking Ranqueado
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.sendToLogin }
        >
          Ir para Inicio
        </button>
      </div>
    );
  }
}

RankingPlayer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RankingPlayer;
