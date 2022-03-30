import React from 'react';
import PropTypes from 'prop-types';
import ButtonNext from './ButtonNext';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      green: '',
      red: '',
      end: false,
      newArray: [],
    };
    this.correctAnswer = this.correctAnswer.bind(this);
    this.resultCorrect = this.resultCorrect.bind(this);
    this.numberDifficulty = this.numberDifficulty.bind(this);
    this.newScores = this.newScores.bind(this);
    this.randomQuestion = this.randomQuestion.bind(this);
    this.embaralhar = this.embaralhar.bind(this);
    this.setNewState = this.setNewState.bind(this);
  }

  componentDidMount() {
    this.setNewState();
  }

  setNewState() {
    const { questionCurrent:
      { incorrect_answers: incorrectAnswers }, questionCurrent } = this.props;
    const array = [...incorrectAnswers, questionCurrent.correct_answer];
    const newArray = this.embaralhar(array);
    this.setState({ newArray });
  }

  newScores(stateStorage, scoreCurrent) {
    document.getElementById('score').innerHTML = (!stateStorage ? scoreCurrent
      : (stateStorage.player.score + scoreCurrent));
  }

  resultCorrect(scoreCurrent) {
    const state = {
      player: {
        name: '',
        assertions: 0,
        score: scoreCurrent,
        gravatarEmail: '',
      },
    };
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    return ((!stateStorage ? localStorage.setItem('state', JSON.stringify(state))
      : (localStorage.setItem('state', JSON.stringify({
        ...stateStorage,
        player: { ...stateStorage.player,
          score: stateStorage.player.score + scoreCurrent,
          assertions: stateStorage.player.assertions + 1 } }))),
    this.newScores(stateStorage, scoreCurrent)));
  }

  numberDifficulty(difficulty, timer) {
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (difficulty) {
    case 'hard':
      return hard * timer;
    case 'medium':
      return medium * timer;
    case 'easy':
      return easy * timer;
    default:
      return 0;
    }
  }

  correctAnswer(verify, question, difficulty, timer) {
    this.setState({
      green: '3px solid rgb(6, 240, 15)',
      red: '3px solid rgb(255, 0, 0)',
      end: true,
    });
    const ten = 10;
    const scoreCurrent = ten + (this.numberDifficulty(difficulty, timer));
    return (verify === question && this.resultCorrect(scoreCurrent));
  }

  embaralhar(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  randomQuestion(newArray) {
    return newArray.map((item, index) => {
      const { green, red, end } = this.state;
      const { questionCurrent:
      { difficulty },
      questionCurrent, timer } = this.props;
      console.log('timer', timer);
      console.log('end', end);

      return (item === questionCurrent.correct_answer)
        ? (
          <button
            data-testid="correct-answer"
            onClick={ () => this.correctAnswer(item,
              questionCurrent.correct_answer, difficulty, timer) }
            type="button"
            value={ item }
            style={ { border: green } }
            disabled={ (end || (timer === 0)) }
          >
            { item }
          </button>
        ) : (
          <button
            value={ item }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            type="button"
            onClick={ () => this.correctAnswer(
              item, questionCurrent.correct_answer, difficulty, timer,
            ) }
            style={ { border: red } }
            disabled={ (end || (timer === 0)) }
          >
            { item }
          </button>
        );
    });
  }

  render() {
    const { end, newArray } = this.state;
    const { questionCurrent: { question, category }, timer, buttonNext } = this.props;
    return (
      <section className="question">
        <div>
          <h4 data-testid="question-category">{ category }</h4>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div>
          { this.randomQuestion(newArray) }
        </div>
        { (end || (timer === 0)) && <ButtonNext onClick={ buttonNext } /> }
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string,
  category: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  correct_answer: PropTypes.string,
}.isRequired;

export default Question;
