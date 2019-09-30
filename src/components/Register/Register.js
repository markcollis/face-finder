import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FACE_FINDER_API_URI } from '../../config';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
    };
  }

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  }

  onSubmitRegister = () => {
    const { registerName, registerEmail, registerPassword } = this.state;
    const { loadUser, onRouteChange } = this.props;
    fetch(`${FACE_FINDER_API_URI}/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then(response => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange('Main');
        } else {
          console.log('Error - user missing id:', user);
        }
      })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-33-l mw6 shadow-5 center bg-white-30">
        <div className="pa4 black-80">
          <div className="measure center">
            <fieldset id="signin" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register for the face finder service</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="emailaddress">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="emailaddress"
                  id="emailaddress"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div>
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Register"
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
}
Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
  onRouteChange: PropTypes.func.isRequired,
};

export default Register;
