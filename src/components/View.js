import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { previewStore } from '../http/timeStamp';
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewAvailable: false,
            downloadLink: false
        }
        previewStore.subscribe(() => {
            console.log('preview store', previewStore.getState());

            this.setState(
                { downloadLink: previewStore.getState().prevAvailable }
            )
        })
    }
    render() {



        return (
            <div>
                <Row>
                    <Col>
                        <ReactPlayer url='http://localhost:5000/video-stream' controls ></ReactPlayer>
                    </Col>
                </Row>
                {this.state.downloadLink ? <div className='mb-5'>
                    <Row>
                        <Col>
                            <p><a href='http://localhost:5000/download'>Download Video</a></p>
                        </Col>
                    </Row>
                </div> : null}
            </div>
        )
    }
}

export default View
