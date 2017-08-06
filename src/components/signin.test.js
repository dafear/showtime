import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './signin';
import {shallow, mount} from 'enzyme';




describe('<Signin />', () => {

it('Renders without crashing', () => {
    shallow(<Signin/>);
});

});