import React from 'react';
import ReactDOM from 'react-dom';
import List from './componets/list';
import {shallow, mount} from 'enzyme';




describe('<List />', () => {

it('Renders without crashing', () => {
    shallow(<List/>);
  });
});


  

 