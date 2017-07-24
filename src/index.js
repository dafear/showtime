import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import List from './componets/list';
import registerServiceWorker from './registerServiceWorker';




ReactDOM.render(
	<Provider store={store}> 
	<List />
	</Provider>,
    document.getElementById('root'));
registerServiceWorker();
