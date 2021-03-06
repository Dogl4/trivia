import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import triviaPng from '../trivia.png';

class Header extends Component {
  constructor() {
    super();

    this.perfilGravatar = this.perfilGravatar.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  getScore() {
    const scoreStore = JSON.parse(localStorage.getItem('state'));
    return !scoreStore ? 0 : scoreStore.player.score;
  }

  perfilGravatar() {
    const { emailReceive, nameReceive } = this.props;
    const email = md5(emailReceive).toString();
    return (
      <header className="header">
        <a href="/">
          <img
            className="img-header"
            src={ triviaPng }
            alt="Home Trivia"
          />
        </a>
        <div>
          { nameReceive
            && (
              <div>
                <img
                  data-testid="header-profile-picture"
                  src={ `https://www.gravatar.com/avatar/${email}` }
                  alt={ email }
                />
                <div>
                  <p
                    data-testid="header-player-name"
                    id="name"
                  >
                    {`Nome: ${nameReceive} `}

                  </p>
                </div>
                <div>
                  <p>
                    Score:
                    {' '}
                    <span data-testid="header-score" id="score">{this.getScore()}</span>
                  </p>
                </div>
              </div>
            )}
        </div>
      </header>
    );
  }

  render() {
    return (
      <div>
        {this.perfilGravatar()}
      </div>
    );
  }
}

Header.propTypes = {
  emailReceive: PropTypes.string.isRequired,
  nameReceive: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailReceive: state.player.email,
  nameReceive: state.player.name,
});

export default connect(mapStateToProps)(Header);
