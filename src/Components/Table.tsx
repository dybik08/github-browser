import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css';
import CONSTANTS from '../Constants/constants'

const TableComponent = (props: any) => {
    const [state, setState] = React.useState({
        searchText: '',
        searchedColumn: '',
    });

    let searchInput: any;

    const getColumnSearchProps = (dataIndex: any) => ({
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
        filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: any, record: any) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text: any) => text,
    });

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setState(prevState => ({
            ...prevState,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        }));
    };

    const handleReset = (clearFilters: any) => {
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
            title: CONSTANTS.REPO_DATA_FIELDS.stargazers_count,
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

    return <Table pagination={{pageSize: 5}} columns={columns} dataSource={props.repos} />;
};

export default TableComponent;
