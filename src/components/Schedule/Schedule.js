import React, { Component } from 'react';
import '../../css/normalize.css';
import '../../css/skeleton.css';
import './Schedule.css';
import store from '../../services/store.service.js'

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: store.events || []
    };
    console.log(store.events);
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
          <button className="button-primary">Create New Event</button>
        </div>
      </div>
    </div>;
  }
}

export default Schedule;
