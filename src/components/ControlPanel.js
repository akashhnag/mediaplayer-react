import React, { Component } from 'react'
import { Row,  Tabs, Tab,  Button } from 'react-bootstrap';
import { postTimeStamp, getFrames, displayFramesStore } from '../http/timeStamp';

import FramesComponent from './FramesComponent';

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
                <Tabs className='mt-3' defaultActiveKey="video" id="uncontrolled-tab-example">
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
                        <FramesComponent></FramesComponent>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default ControlPanel
