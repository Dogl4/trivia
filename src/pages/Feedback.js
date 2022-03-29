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
    this.setState({
      assertions: stateStorage.player.assertions,
      score: stateStorage.player.score,
    });
  }

  sendToInitial() {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { player } = JSON.parse(localStorage.getItem('state'));
    const objRanking = {
      image: `https://www.gravatar.com/avatar/${player.gravatarEmail}`,
      name: player.name,
      email: player.gravatarEmail,
      score: player.score,
    };
    if (ranking) {
      const rankingATT = [...ranking, objRanking];
      localStorage.setItem('ranking', JSON.stringify(rankingATT));
    } else {
      const contentRanking = [
        objRanking,
      ];
      localStorage.setItem('ranking', JSON.stringify(contentRanking));
    }
  }

  sendToRanking() {
    this.handleRanking();
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.state;
    const minAssertionsAllowed = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        <div className="card">
          {assertions >= minAssertionsAllowed ? <p>Mandou bem!</p>
            : <p>Podia ser melhor...</p>}
          <div>
            <p data-testid="feedback-total-question">{`Assertions: ${assertions}`}</p>
            <p data-testid="feedback-total-score">{`Score: ${score}`}</p>
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
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // addRanking: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addRanking: (state) => dispatch(setRanking(state)),
});

export default connect(null, mapDispatchToProps)(Feedback);
