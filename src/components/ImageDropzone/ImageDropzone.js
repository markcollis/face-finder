import React, { Component, Fragment } from 'react';
import './ImageDropzone.css';
import ReactDropzone from 'react-dropzone';

class ImageDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files)
    });
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100
    };

    return (
      <div>
        <ReactDropzone
          accept='image/*'
          onDrop={this.onPreviewDrop}
        >
          <p>Drag and drop an image, or click to open a local image file</p>
        </ReactDropzone>
        {this.state.files.length > 0 &&
          <Fragment>
            <h3>Previews</h3>
            {this.state.files.map((file) => (
              <img
                alt='preview'
                key={file.preview}
                src={file.preview}
                style={previewStyle}
              />
            ))}
          </Fragment>
        }
      </div>
    );
  }
}

export default ImageDropzone;
