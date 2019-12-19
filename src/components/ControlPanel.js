import React, { Component } from 'react'
import { Row, Col, Tabs, Tab, Modal, Button } from 'react-bootstrap';
import { postTimeStamp, getFrames, displayFramesStore } from '../http/timeStamp';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTimeMins: 0,
            startTimeSecs: 0,
            endTimeMins: 0,
            endTimeSecs: 0,
            format: 'mp4',
            filename: '',
            frames: '',
            displayFrames: false,
            framenames: [],
            showModal: false,
            imageName: ''

        }
        displayFramesStore.subscribe(() => {
            console.log(displayFramesStore.getState());

            this.setState(
                {
                    displayFrames: displayFramesStore.getState().displayFrames,
                    framenames: displayFramesStore.getState().filenames
                }
            )
        })
    }
    inputHandler = (e) => {
        let name = e.target.name;
        if (name === 'start-mins') {
            this.setState({
                startTimeMins: e.target.value
            })

        }
        else if (name === 'start-secs') {
            this.setState({
                startTimeSecs: e.target.value
            })
        }
        if (name === 'end-mins') {
            this.setState({
                endTimeMins: e.target.value
            })

        }
        else if (name === 'end-secs') {
            this.setState({
                endTimeSecs: e.target.value
            })
        }
        else if (name === 'filename') {
            this.setState({
                filename: e.target.value
            })
        }
        else if (name === 'frames') {
            console.log(typeof (e.target.value));

            this.setState({
                frames: e.target.value
            })
        }

    }

    formatChanged = (e) => {
        console.log(e.target.value);
        this.setState({
            format: e.target.value
        })

    }

    buttonAction = (e) => {
        let duration = this.state.endTimeSecs - this.state.startTimeSecs;


        let data = {
            startTimeMins: this.state.startTimeMins,
            startTimeSecs: this.state.startTimeSecs,
            filename: this.state.filename,
            format: this.state.format,
            duration: duration

        }
        console.log(data);


        postTimeStamp(data);


    }

    getFrames = () => {
        console.log('get frames');
        let duration = this.state.endTimeSecs - this.state.startTimeSecs;


        let data = {
            startTimeMins: this.state.startTimeMins,
            startTimeSecs: this.state.startTimeSecs,
            filename: this.state.filename,
            format: this.state.format,
            frames: this.state.frames,
            duration: duration

        }
        getFrames(data);

    }

    imageClicked = (ele) => {
        console.log('image clicked', ele);
        this.setState({
            showModal: true,
            imageName: ele
        })
    }

    downloadImage = () => {
        console.log('download');

    }


    render() {
        return (
            <div>
                <Tabs defaultActiveKey="video" id="uncontrolled-tab-example">
                    <Tab eventKey="video" title="Edit Video">
                        <div className='mt-4'>
                            <Row>
                                <div>
                                    <p>
                                        Start time: <input type='number' onChange={this.inputHandler} name='start-mins' min='0' max='59'></input>mins{' '}
                                        <input type='number' onChange={this.inputHandler} name='start-secs' min='0' max='59' ></input>secs
                                        </p>

                                    <p>
                                        End time: <input type='number' onChange={this.inputHandler} name='end-mins' min='0' max='59'></input>mins{' '}
                                        <input type='number' onChange={this.inputHandler} name='end-secs' min='0' max='59'></input>secs
                                        </p>

                                    <p>
                                        Format:{' '}
                                        <select onChange={this.formatChanged}>
                                            <option value='mp4'>mp4</option>
                                            <option value='avi'>avi</option>
                                            <option value='webm'>webm</option>
                                        </select>
                                    </p>

                                    <p>
                                        File name: <input type='text' onChange={this.inputHandler} name='filename'></input>
                                    </p>

                                    <p>
                                        <Button variant='primary' className='mt-2' onClick={this.buttonAction}>Convert</Button>
                                    </p>
                                </div>
                            </Row>
                        </div>
                    </Tab>

                    <Tab eventKey="image" title="Get Frames">
                        <div className='mt-4'>
                            <Row>
                                <div>
                                    <p>Start time: <input type='number' onChange={this.inputHandler} name='start-mins' min='0' max='59'></input>mins{' '}
                                        <input type='number' onChange={this.inputHandler} name='start-secs' min='0' max='59' ></input>secs</p>

                                    <p>End time: <input type='number' onChange={this.inputHandler} name='end-mins' min='0' max='59'></input>mins{' '}
                                        <input type='number' onChange={this.inputHandler} name='end-secs' min='0' max='59'></input>secs</p>

                                    <p>
                                        Format:{' '}
                                        <select onChange={this.formatChanged}>
                                            <option value='jpg'>jpg</option>
                                            <option value='png'>png</option>
                                            <option value='tiff'>tiff</option>
                                        </select>
                                    </p>

                                    <p>
                                        No. of frames:{' '}
                                        <input type='number' name='frames' onChange={this.inputHandler}></input>
                                    </p>

                                    <p>
                                        File name:{' '}
                                        <input type='text' onChange={this.inputHandler} name='filename'></input>
                                    </p>

                                    <p>
                                        <Button variant="primary" className='mt-2' onClick={this.getFrames}>Get Frames</Button>
                                    </p>

                                </div>
                            </Row>

                            {this.state.displayFrames ?
                                <div className='mt-3'>
                                    Frames:

                                        <div>
                                        <Row>
                                            {this.state.framenames[0].map((ele) => {
                                                return (
                                                    <div key={ele}>
                                                        <Col>
                                                            <div className='mt-2'>
                                                                <a href='#'><img src={'http://localhost:5000/streamImage:' + ele} height='100px'
                                                                    width='150px' onClick={() => this.imageClicked(ele)}></img></a>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                )
                                            })}
                                            <Modal
                                                size="lg"
                                                show={this.state.showModal}
                                                onHide={() => this.setState({ showModal: false })}
                                                aria-labelledby="example-modal-sizes-title-lg"
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="example-modal-sizes-title-lg">
                                                        {this.state.imageName}
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <img src={'http://localhost:5000/streamImage:' + this.state.imageName} width='100%'></img>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>Close</Button>
                                                    <Button variant="primary" href={'http://localhost:5000/imageDownload:' + this.state.imageName}>
                                                        Download</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Row>

                                    </div>

                                    <div className='mt-3'>
                                        <Row>
                                            <Col>
                                                <a href='http://localhost:5000/zipDownload'>Download as zip</a>
                                            </Col>
                                        </Row>
                                    </div>

                                </div> : null}

                        </div>
                    </Tab>

                </Tabs>

            </div>
        )
    }
}

export default ControlPanel
