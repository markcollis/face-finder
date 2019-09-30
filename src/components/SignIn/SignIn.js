import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FACE_FINDER_API_URI } from '../../config';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
    const { signInEmail, signInPassword } = this.state;
    const { loadUser, onRouteChange } = this.props;
    fetch(`${FACE_FINDER_API_URI}/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then(response => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange('Main');
        } else {
          console.log('Error - user without id:', user);
        }
      })
      .catch((err) => {
        console.log('Error: ', err.message);
      });
  }

  render() {
    const { signInEmail, signInPassword } = this.state;
    return (
      <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-33-l mw6 shadow-5 center bg-white-30">
        <div className="pa4 black-80">
          <div className="measure center">
            <fieldset id="signin" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt">
                <label className="db fw6 lh-copy f6" htmlFor="emailaddress">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  value={signInEmail}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  value={signInPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Sign in"
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
}
SignIn.propTypes = {
  loadUser: PropTypes.func.isRequired,
  onRouteChange: PropTypes.func.isRequired,
};

export default SignIn;
