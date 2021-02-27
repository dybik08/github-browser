import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css';
import CONSTANTS from '../constants/constants';
import { Repository } from '../constants/types';
import { useDispatch, useSelector } from 'react-redux';

function DetailsButton(props: { onClick: () => void }) {
    return (
        <Button type='primary' onClick={props.onClick}>
            Details
        </Button>
    );
}

const TableComponent = (props: {
    repos: Repository[] | null;
    setSelectedRepository: (repoData: Repository) => void;
}) => {
    const repositories = useSelector(
        (state: {
            repositories: {
                repos: Repository[];
                loading: boolean;
            };
        }) => state.repositories
    );
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        searchText: '',
        searchedColumn: '',
    });

    if (!repositories.repos) {
        return null;
    }

    let searchInput: any;

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: string | number | boolean, record: any) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes((value as string).toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: boolean) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text: string) => text,
    });

    const handleSearch = (selectedKeys: string, confirm: () => void, dataIndex: string) => {
        confirm();
        setState(prevState => ({
            ...prevState,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        }));
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setState(prevState => ({ ...prevState, searchText: '' }));
    };

    const columns = [
        {
            title: CONSTANTS.REPO_DATA_FIELDS.login,
            dataIndex: CONSTANTS.REPO_DATA_FIELDS.login,
            key: CONSTANTS.REPO_DATA_FIELDS.login,
            ...getColumnSearchProps(CONSTANTS.REPO_DATA_FIELDS.login),
        },
        {
            title: CONSTANTS.REPO_DATA_FIELDS.language,
            dataIndex: CONSTANTS.REPO_DATA_FIELDS.language,
            key: CONSTANTS.REPO_DATA_FIELDS.language,
            width: '20%',
            ...getColumnSearchProps(CONSTANTS.REPO_DATA_FIELDS.language),
        },
        {
            title: 'stars',
            dataIndex: CONSTANTS.REPO_DATA_FIELDS.stargazers_count,
            key: CONSTANTS.REPO_DATA_FIELDS.stargazers_count,
            ...getColumnSearchProps(CONSTANTS.REPO_DATA_FIELDS.stargazers_count),
        },
        {
            title: CONSTANTS.REPO_DATA_FIELDS.name,
            dataIndex: CONSTANTS.REPO_DATA_FIELDS.name,
            key: CONSTANTS.REPO_DATA_FIELDS.name,
            width: '30%',
            ...getColumnSearchProps(CONSTANTS.REPO_DATA_FIELDS.name),
        },
        {
            width: '5%',
            dataIndex: CONSTANTS.REPO_DATA_FIELDS.details,
            key: CONSTANTS.REPO_DATA_FIELDS.details,
            render: (text: any) => text,
        },
    ];

    const reposDataWithButton = repositories.repos?.map((repoData: Repository) => {
        return {
            ...repoData,
            details: (
                <DetailsButton
                    onClick={() => {
                        props.setSelectedRepository(repoData);
                    }}
                />
            ),
        };
    });

    return <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={reposDataWithButton} />;
};

export default TableComponent;