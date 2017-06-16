import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import store from './store';

// import Board from './componets/board';
import List from './componets/list';

import registerServiceWorker from './registerServiceWorker';
import './index.css';




ReactDOM.render(
	<Provider store={store}> 
	<List />
	</Provider>,
    document.getElementById('root'));
registerServiceWorker();
