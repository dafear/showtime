import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card';
import {shallow, mount} from 'enzyme';




describe('<Card />', () => {

it('Renders without crashing', () => {
    shallow(<Card/>);
});

      it('Renders the text', () => {
        const text = "You should get access to this page only after authentication.";
        const wrapper = shallow(<Card text={text} />);
        console.log(wrapper.renderer.getRenderOutput());
        expect(wrapper.renderer.getRenderOutput().props.children[0]).toEqual(text);
    });


});


  