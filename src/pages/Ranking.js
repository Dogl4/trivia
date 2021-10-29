import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RankingPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
    this.sendToLogin = this.sendToLogin.bind(this);
    this.sortRanking = this.sortRanking.bind(this);
  }

  componentDidMount() {
    this.sortRanking();
  }

  sortRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const scores = ranking.reduce((acc, player) => {
      acc.push(player.score);
      return acc;
    }, []);
    const sortedScores = scores.sort((a, b) => b - a)
      .map((score) => ranking.filter((player) => player.score === score));
    this.setState({ ranking: sortedScores });
  }

  sendToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <div data-testid="ranking-title">
        <h1>Ranking</h1>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img src={ player[0].image } alt="imagem do usuario" />
            <p data-testid={ `player-name-${index}` }>{player[0].name}</p>
            <p data-testid={ `player-score-${index}` }>{player[0].score}</p>
          </div>
        ))}
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
