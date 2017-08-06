import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list';
import {shallow, mount} from 'enzyme';




describe('<List />', () => {

it('Renders without crashing', () => {
    shallow(<List/>);
  });
});


  

 