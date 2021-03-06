import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

require('./styles/main.scss');

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('main'));
