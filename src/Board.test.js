import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import store from './store';



describe('<Board />', () => {

it('Renders without crashing', () => {
    shallow(<Provider store={store}>
    	<Board />
    	</Provider>);
    });
});

