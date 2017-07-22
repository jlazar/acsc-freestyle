import React, { Component } from 'react';
import '../../css/normalize.css';
import '../../css/skeleton.css';

import store from '../../services/store.service.js';

class Athletes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athletes: store.athletes || []
    };
  }

  componentDidMount() { }

  componentWillUnmount() { }

  getGender(gender) {
    if (gender === 'M') {
      return 'Male';
    }
    if (gender === 'F') {
      return 'Female';
    }
  }

  render() {
    return <div className="container">
      <div className="schedule">
        <ul>
          {/*Header  */}
          <li className="schedule-row">
            <div className="schedule-location schedule-location-header">
              Name
          </div>
            <div className="schedule-date schedule-date-header">
              Gender
          </div>
            <div className="schedule-date schedule-date-header">
              Age
          </div>
            <div className="schedule-results">
              Get results
          </div>
          </li>
          {this.state.athletes.map((item, index) =>
            <li className="schedule-row" key={index}>
              <div className="schedule-location">
                {item.first_name} {item.last_name}
              </div>
              <div className="schedule-date">
                {this.getGender(item.sex)}
              </div>
              <div className="schedule-date">
                {item.age}
              </div>
              <div className="schedule-results">
                <button className="schedule-results-btn">Get Results</button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>;
  }
}

export default Athletes;
