import React, { Component } from 'react';
import logo from './uscsa-logo.png';
import './App.css';
import '../../css/skeleton.css';
import NavBar from '../NavBar/NavBar.js';
import Home from '../Home/Home.js';
import Schedule from '../Schedule/Schedule.js';
import Athletes from '../Athletes/Athletes.js';
import Standings from '../Standings/Standings.js';
import Footer from '../Footer/Footer.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navClicked: 'Home'
    };
  }

  setNavClicked(clicked) {
    console.log(clicked);
    this.setState({ navClicked: clicked });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">USCSA Allegheny Conference Freestyle</h2>
        </div>
        <NavBar setNavClicked={clicked => this.setNavClicked(clicked)} />
        <div>
          {this.state.navClicked === 'Home' ? <Home /> : null}
          {this.state.navClicked === 'Schedule' ? <Schedule /> : null}
          {this.state.navClicked === 'Athletes' ? <Athletes /> : null}
          {this.state.navClicked === 'Standings' ? <Standings /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
