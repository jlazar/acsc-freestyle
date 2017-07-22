import React, { Component } from 'react';
import './normalize.css';
import './skeleton.css';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedNav: false,
      clicked: 'home'
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', event => this.handleScroll(event));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', event => this.handleScroll(event));
  }

  handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > 110 && !this.state.fixedNav) {
      this.setState({ fixedNav: true });
    } else if (scrollTop < 110 && this.state.fixedNav) {
      this.setState({ fixedNav: false });
    }
  }

  onClick(clicked) {
    this.props.setNavClicked(clicked);
  }

  render() {
    return (
      <div
        className={
          this.state.fixedNav ? 'container has-docked-nav' : 'container'
        }
      >
        <div className="navbar-spacer" />
        <div className="navbar">
          <div className="container">
            <ul className="navbar-list">
              <li className="navbar-item">
                <a
                  className="navbar-link"
                  onClick={this.onClick.bind(this, 'Home')}
                >
                  Home
                </a>
              </li>
              <li className="navbar-item">
                <a
                  className="navbar-link"
                  onClick={this.onClick.bind(this, 'Schedule')}
                >
                  Schedule
                </a>
              </li>
              <li className="navbar-item">
                <a
                  className="navbar-link"
                  onClick={this.onClick.bind(this, 'Profile')}
                >
                  Profile
                </a>
              </li>
              <li className="navbar-item">
                <a
                  className="navbar-link"
                  onClick={this.onClick.bind(this, 'Standings')}
                >
                  Standings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
