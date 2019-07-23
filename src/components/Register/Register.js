import React, { Component } from 'react';
import { FACE_FINDER_API_URI } from '../../config';

class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: ''
    };
  }

  onNameChange = (event) => {
    this.setState({registerName: event.target.value});
  }

  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value});
  }

  onSubmitRegister = () => {
    fetch(`${FACE_FINDER_API_URI}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('Main');
      } else {
        console.log('Error:', user);
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-90 w-50-m w-33-l mw6 shadow-5 center bg-white-30'>
        <div className='pa4 black-80'>
          <div className='measure center'>
            <fieldset id='signin' className='ba b--transparent ph0 mh0'>
              <legend className='f4 fw6 ph0 mh0'>Register for the face finder service</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
                <input
                  onChange={this.onNameChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='name'
                  id='name'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='emailaddress'>Email</label>
                <input
                  onChange={this.onEmailChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='emailaddress'
                  id='emailaddress'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={this.onSubmitRegister}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='button'
                value='Register'
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Register;
