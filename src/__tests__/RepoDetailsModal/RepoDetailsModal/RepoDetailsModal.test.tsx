import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {RepoDetailsModal} from "../../../components/RepoDetailsModal/RepoDetailsModal";

configure({ adapter: new Adapter() });

const mock_repository_data = {
    name: 'name',
    description: 'some description',
    language: 'javascript',
    stargazers_count: 1,
    forks: 2,
    owner: {
        repos_url: '',
        type: '',
        avatar_url: '',
        login: '',
    },
    created_at: '2020:10:12',
    updated_at: '2020:10:14',
    license: {
        name: 'MIT',
    },
};

describe('RepoDetailsModal', () => {
    const wrapper: any = shallow(<RepoDetailsModal repository_data={mock_repository_data}  handleCancel={jest.fn()} handleOk={jest.fn()}/>);

    it('render correct repo-description', () => {
        const repo_description = wrapper.find({ id: 'repo-description' }).text();
        expect(repo_description).toBe(mock_repository_data.description);
    });

    it('render correct created_at', () => {
        const created_at = wrapper.find({ id: 'created_at' }).text();
        expect(created_at).toBe('Created: ' + mock_repository_data.created_at);
    });

    it('render correct updated_at', () => {
        const updated_at = wrapper.find({ id: 'updated_at' }).text();
        expect(updated_at).toBe('Last change: ' + mock_repository_data.updated_at);
    });
});
