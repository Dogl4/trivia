import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { /* getApiTokenThunk, */ setPlayerInfo, getApiTriviaThunk } from '../actions';
import triviaImg from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.redConfig = this.redConfig.bind(this);
    this.resultCorrect = this.resultCorrect.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem('state');
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  resultCorrect(name, email) {
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    return ((!stateStorage ? localStorage.setItem('state', JSON.stringify(state))
      : (localStorage.setItem('state', JSON.stringify({
        ...stateStorage,
        player: {
          ...stateStorage.player,
          name: state.name,
          gravatarEmail: state.gravatarEmail,
        },
      })))));
  }

  handleClick() {
    const { setUserInfo } = this.props;
    const { history } = this.props;
    setUserInfo(this.state);
    const { setApiTrivia } = this.props;
    setApiTrivia();
    const { name, email } = this.state;
    this.resultCorrect(name, email);
    history.push('/jogo');
  }

  redConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="block">
        <form className="card">
          <img src={ triviaImg } alt="logo" className="img" />
          <label className="label" htmlFor="input-name">
            Name
            <input
              type="text"
              id="input-name"
              name="name"
              placeholder="Insira seu nome"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label className="label" htmlFor="input-email">
            Email
            <input
              type="email"
              id="input-email"
              name="email"
              placeholder="email@gmail.com"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ !(name.length > 0 && email.length > 0) }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            START
          </button>
        </form>
        <button
          data-testid="btn-settings"
          className="btn-settings"
          onClick={ this.redConfig }
          type="button"
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  setApiToken: PropTypes.func,
  setUserInfo: PropTypes.func,
}.isRequired;

const mapDispachToProps = (dispatch) => ({
  // setApiToken: () => dispatch(getApiTokenThunk()),
  setUserInfo: (payload) => dispatch(setPlayerInfo(payload)),
  setApiTrivia: () => dispatch(getApiTriviaThunk()),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  state,
});

export default connect(mapStateToProps, mapDispachToProps)(Login);
