import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { setRanking } from '../actions';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      assertions: 0,
      score: 0,
    };
    this.sendToInitial = this.sendToInitial.bind(this);
    this.getAssertions = this.getAssertions.bind(this);
    this.sendToRanking = this.sendToRanking.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  componentDidMount() {
    this.getAssertions();
  }

  getAssertions() {
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    this.setState({ assertions: stateStorage.player.assertions,
      score: stateStorage.player.score });
  }

  sendToInitial() {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking() {
    const { addRanking } = this.props;
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    const ranking = [{
      image: [`https://www.gravatar.com/avatar/${stateStorage.player.gravatarEmail}`],
      name: [stateStorage.player.name],
      score: [stateStorage.player.score],
    }];
    addRanking(ranking);
    // const rankingArray = Object.values(ranking);
    // return !stateStorage.ranking ? localStorage.setItem('ranking', JSON.stringify(ranking))
    return localStorage.setItem('ranking', JSON.stringify({
      ...stateStorage,
      ranking: [{ ...stateStorage.ranking,
        image: [...ranking.image],
        name: [...ranking.name],
        score: [...ranking.score],
      }],
    }));
  }

  sendToRanking() {
    const { history } = this.props;
    history.push('/ranking');
    this.handleRanking();
    // const infoPlayer = JSON.parse(localStorage.getItem('state'));
    // console.log(infoPlayer);
    // console.log(infoPlayer.player.name);

    // const imageFake = [];
    // const imageReal = imageFake.push(infoPlayer.player.gravatarEmail);
    // const nameFake = [];
    // const nameReal = nameFake.push(infoPlayer.player.name);
    // const scoreFake = [];
    // const scoreReal = scoreFake.push(infoPlayer.player.score);
    // const ranking = {
    //   image: imageFake,
    //   name: nameFake,
    //   score: scoreFake,
    // };
    // localStorage.setItem('ranking', JSON.stringify(ranking));
    // addRanking(ranking);
  }

  render() {
    const { assertions, score } = this.state;
    const minAssertionsAllowed = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        {assertions >= minAssertionsAllowed ? <p>Mandou bem!</p>
          : <p>Podia ser melhor...</p>}
        <div>
          <p data-testid="feedback-total-question">{assertions}</p>
          <p data-testid="feedback-total-score">{score}</p>
        </div>
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.sendToInitial }
          >
            Jogar Novamente
          </button>
        </div>
        <div>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.sendToRanking }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  addRanking: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addRanking: (state) => dispatch(setRanking(state)),
});

export default connect(null, mapDispatchToProps)(Feedback);
