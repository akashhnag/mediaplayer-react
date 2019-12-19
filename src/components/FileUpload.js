import React, { Component } from 'react'
import { fileUpload } from '../http/fileUpload';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    fileUploadHandler = (e) => {
        let data = new FormData();
        console.log(data);
        data.append('file', e.target.files[0]);
        fileUpload(data)
    }

    render() {
        return (
            <div>
                <input type='file' name='file' accept='video/*' onChange={this.fileUploadHandler}></input>
            </div>
        )
    }
}

export default FileUpload
