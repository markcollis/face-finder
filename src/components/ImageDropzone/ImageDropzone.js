import React, { Component } from 'react';
import './ImageDropzone.css';
import ReactDropzone from 'react-dropzone';

class ImageDropzone extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     files: []
  //   };
  // }

  onDrop = (files) => {
    this.props.onDropFile(files);
    // this.setState({
    //   files: this.state.files.concat(files)
    // });
  }

    // const previewStyle = {
    //   display: 'inline',
    //   width: 100,
    //   height: 100
    // };

  render() {
    return (
      <div className='ma4 mt0'>
        <div className='centred'>
          <div className='form centred pa3 br3 shadow-5'>
            <ReactDropzone
              accept='image/*'
              className='mw8 h3 bw1 br3 b--dashed b--dark-blue'
              multiple={false}
              onDrop={this.onDrop}
            >
              <p className='pa1'>Drag and drop an image, or click to open a local image file</p>
            </ReactDropzone>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDropzone;
