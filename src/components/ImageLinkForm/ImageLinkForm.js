import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className='ma4 mt0'>
      <div className='centred'>
        <p className='f4 mw6'>
          {'This Magic Brain will detect faces in your pictures. Give it a try!'}
        </p>
      </div>
      <div className='centred'>
        <div className='formwidth mw8 bg-white-30 centred pa3 br3 shadow-5'>
          <input className='f4 pa2 w-70 centred' type='text' onChange={onInputChange} />
          <button
            className='w-30 grow f5 link ph3 pv2 dib white bg-dark-blue'
            onClick={onButtonSubmit}
            >Load from URL</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
