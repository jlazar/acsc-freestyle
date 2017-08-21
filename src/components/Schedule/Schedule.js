import React, { Component } from 'react';
import '../../css/normalize.css';
import '../../css/skeleton.css';
import './Schedule.css';
import store from '../../services/store.service.js';
import 'elemental/less/elemental.less'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'elemental'

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: store.events || [],
      modalIsOpen: true
    };
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  render() {

    return <div className="container">
      <div className="schedule">
        <ul>
          {/*Header  */}
          <li className="schedule-row">
            <div className="schedule-location schedule-location-header">
              Location
            </div>
            <div className="schedule-date schedule-date-header">
              Date
            </div>
            <div className="schedule-results">
              Results
            </div>
          </li>
          {this.state.events.map((item, index) =>
            <li className="schedule-row" key={index}>
              <div className="schedule-location">
                {item.location}
              </div>
              <div className="schedule-date">
                {new Date(item.event_date).toLocaleDateString("en-US")}
              </div>
              <div className="schedule-results">
                <button className="schedule-results-btn">Get Results</button>
              </div>
            </li>
          )}
        </ul>
        <div className="schedule-results">
          <button className="button-primary" onClick={this.toggleModal.bind(this)}>Create New Event</button>
        </div>
      </div>
      <Modal isOpen={this.state.modalIsOpen} onCancel={this.toggleModal.bind(this)} backdropClosesModal>
        <ModalHeader text="Lots of text to show scroll behavior" showCloseButton onClose={this.toggleModal.bind(this)} />
        <ModalBody>test</ModalBody>
        <ModalFooter>
          <Button type="primary" onClick={this.toggleModal.bind(this)}>Close modal</Button>
          <Button type="link-cancel" onClick={this.toggleModal.bind(this)}>Also closes modal</Button>
        </ModalFooter>
      </Modal>
    </div>;
  }
}

export default Schedule;
