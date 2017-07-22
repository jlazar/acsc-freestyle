import React, { Component } from 'react';
import homeImg from './uscsa-freestyle.jpeg';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  componentWillUnmount() { }

  render() {
    return (
      <div className="container">
        <img src={homeImg} className="home-img" alt="home" />
      </div>
    );
  }
}

export default Home;
