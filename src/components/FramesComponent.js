import React, { Component } from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { getFrames, displayFramesStore } from '../http/timeStamp';

class FramesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTimeMins: 0,
            startTimeSecs: 0,
            endTimeMins: 0,
            endTimeSecs: 0,
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

        else if (name === 'frames') {
            this.setState({
                frames: e.target.value
            })
        }

    }

    getFrames = () => {
        console.log('get frames');
        let duration = this.state.endTimeSecs - this.state.startTimeSecs;
        let data = {
            startTimeMins: this.state.startTimeMins,
            startTimeSecs: this.state.startTimeSecs,
            filename: this.state.filename,
            frames: this.state.frames,
            duration: duration
        }
        getFrames(data);
    }

    render() {
        return (
            <div>
                <div className='mt-4'>
                    <Row>
                        <div>
                            <p>Start time: <input type='number' onChange={this.inputHandler} name='start-mins' min='0' max='59'></input>mins{' '}
                                <input type='number' onChange={this.inputHandler} name='start-secs' min='0' max='59' ></input>secs</p>

                            <p>End time: <input type='number' onChange={this.inputHandler} name='end-mins' min='0' max='59'></input>mins{' '}
                                <input type='number' onChange={this.inputHandler} name='end-secs' min='0' max='59'></input>secs</p>

                            <p>
                                No. of frames:{' '}
                                <input type='number' name='frames' onChange={this.inputHandler}></input>
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
                                                        <a href='/#'><img src={'http://localhost:5000/streamImage:' + ele} height='100px'
                                                            width='150px' onClick={() => this.imageClicked(ele)} alt={ele}></img></a>
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
                                            <img src={'http://localhost:5000/streamImage:' + this.state.imageName} width='100%' alt='frame'></img>
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

                        </div> : null

                        }

                </div>
            </div>
        )
    }
}

export default FramesComponent
