import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Question from '../components/question';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <main>
        <Header />
        { console.log(this.props) }
        { questions && questions.map((question, index) => (
          <Question key={ index } questionCurrent={ question } />)) }
      </main>
    );
  }
}

Game.propTypes = {
  setApiTrivia: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  state,
});

export default connect(mapStateToProps)(Game);