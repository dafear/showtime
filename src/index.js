import React from 'react';
import ReactDOM from 'react-dom';
import Board from './componets/board';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();
