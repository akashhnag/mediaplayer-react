import React, { Component } from 'react';

import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ControlPanel from './components/ControlPanel';
import View from './components/View';
import FileUpload from './components/FileUpload';
import NavbarComponent from './components/NavbarComponent';

import { store } from './http/fileUpload';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: false
    }
    store.subscribe(() => {
      console.log(store.getState().uploaded);

      this.setState(
        { uploadStatus: store.getState().uploaded }
      )
    })

  }

  render() {
    return (
      <div className="App">
        <Container fluid={true}>
          <Row>
            <Col>
              <NavbarComponent></NavbarComponent>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <div className='mt-3'>
                <FileUpload></FileUpload><br></br>
                {this.state.uploadStatus ? <div>
                  <View></View><br></br>
                </div> : null}
              </div>
            </Col>

            <Col sm={6}>
              <div>
                <ControlPanel></ControlPanel>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
