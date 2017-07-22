import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './services/express.service.js';
import './services/store.service.js';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
