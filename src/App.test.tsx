import React from 'react';
import {App} from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('antd/dist/antd.css');

configure({ adapter: new Adapter() });

describe('App testing', () => {

  it('render correct app header', () => {
    const wrapper = shallow(<App />);
    const headerTitle = wrapper.find({className: 'App-header'}).text();
    expect(headerTitle).toBe('Github Searcher');
  })
});
