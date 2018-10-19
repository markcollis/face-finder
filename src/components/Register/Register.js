import React from 'react';

const Register = ({ onRouteChange }) => {
  return (
    <article className='br3 ba b--black-10 mv4 w-90 w-50-m w-33-l mw6 shadow-5 center bg-white-30'>
      <div className='pa4 black-80'>
        <form className='measure center'>
          <fieldset id='signin' className='ba b--transparent ph0 mh0'>
            <legend className='f4 fw6 ph0 mh0'>Register for the face finder service</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='text'
                name='name'
                id='name'
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='emailaddress'>Email</label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                name='emailaddress'
                id='emailaddress'
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='password'
                id='password'
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={() => onRouteChange('Main')}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='button'
              value='Register'
            />
          </div>
        </form>
      </div>
    </article>
  );
}

export default Register;
