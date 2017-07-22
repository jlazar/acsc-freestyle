import React, { Component } from 'react';
import './Footer.css';


class Footer extends Component {
    render() {
        return (
            <div className='container footer'>
                <ul className="footer-list">
                    <li className="footer-item">
                    Copyright &copy; &nbsp; 
                        <a className="footer-link" href="https://github.com/jlazar">
                            jlazar
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Footer;
