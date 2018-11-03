import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: ''
    };
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    console.log(this.state);
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then((response) => response.json())
      .then((user) => {
        // need to alter this as response is now user object
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('Main');
      }
    });
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className='br3 ba b--black-10 mv4 w-90 w-50-m w-33-l mw6 shadow-5 center bg-white-30'>
        <div className='pa4 black-80'>
          <div className='measure center'>
            <fieldset id='signin' className='ba b--transparent ph0 mh0'>
              <legend className='f4 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
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
              onClick={this.onSubmitSignIn}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='button'
              value='Sign in'
              />
            </div>
            <div className='lh-copy mt3'>
              <p
              onClick={() => onRouteChange('Register')}
              className='f6 link dim black db pointer'
              >Register</p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default SignIn;
