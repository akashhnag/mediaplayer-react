import React from 'react';
import logo from './logo.svg';
import './App.css';
import video from './video.webm';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player'

function App() {
  return (
    <div className="App">
      <Row>
        <Col>
          <ReactPlayer url={video} controls></ReactPlayer>
        </Col>


        <Col sm={6}>
          <Row>
            <div>
              Start time:<input type='text' onChange={inputHandler} name='start'></input>{'  '}
              End time:<input type='text' onChange={inputHandler} name='end'></input>
            </div>
          </Row>
          <Row>
            <button onClick={buttonAction}>Submit</button>
          </Row>


        </Col>
      </Row>
    </div>
  );
}

function inputHandler(e) {
  let name = e.target.name;
  if (name === 'start') {
    console.log(e.target.value);

  }
  else if (name === 'end') {
    console.log(e.target.value);

  }

}

function buttonAction() {
  console.log('button clicked');

}

export default App;
