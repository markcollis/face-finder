import React from 'react';

const Profile = ({user}) => {
  const dateJoined = new Date(user.joined).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
  return (
    <article className='br3 ba b--black-10 mv4 w-90 w-50-m w-33-l mw6 shadow-5 center bg-white-30'>
      <div className='pa4 black-80'>
        <div className='measure center'>
          <div className='ba b--transparent ph0 mh0'>
            <p className='f4 fw6 ph0 mh0'>User Profile</p>
            <p className='db fw6 lh-copy f6'>Name</p>
            <p className='pa2 ba bg-transparent hover-bg-black hover-white w-100'>{user.name}</p>
            <p className='db fw6 lh-copy f6'>Email address</p>
            <p className='pa2 ba bg-transparent hover-bg-black hover-white w-100'>{user.email}</p>
            <p className='db fw6 lh-copy f6'>Date joined</p>
            <p className='pa2 ba bg-transparent hover-bg-black hover-white w-100'>{dateJoined}</p>
            <p className='db fw6 lh-copy f6'>User ID</p>
            <p className='pa2 ba bg-transparent hover-bg-black hover-white w-100'>{user.id}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Profile;
