import React, {FC, ReactElement} from 'react';
import {configure, shallow, ShallowWrapper} from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import RepoListItem from "../../Components/RepoList/RepoListItem";
import mockRepositoryData from "../../__mocks__/mockRepositoryData";

configure({ adapter: new Adapter() });

describe('RepoListItem', () => {
    let wrapper = shallow(<RepoListItem listItemKey={mockRepositoryData.name + 1} repository={mockRepositoryData} />);

    it('renders correctly', () => {
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });
    }
);