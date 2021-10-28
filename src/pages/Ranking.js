import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RankingPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
      score: '',
    };
    this.sendToLogin = this.sendToLogin.bind(this);
    this.getPlayerInfo = this.getPlayerInfo.bind(this);
  }

  componentDidMount() {
    this.getPlayerInfo();
  }

  getPlayerInfo() {
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    this.setState({
      image: stateStorage.player.image,
      name: stateStorage.player.name,
      score: stateStorage.player.score });
  }

  sendToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { image, name, score } = this.state;
    return (
      <div data-testid="ranking-title">
        <h1>Ranking</h1>
        <img src={ image } alt="imagem do usuario" />
        <p data-testid="player-name-0">{name}</p>
        <p data-testid="player-score-0">{score}</p>
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
