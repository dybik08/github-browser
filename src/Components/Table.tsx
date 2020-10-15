import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css';

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

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
            title: 'login',
            dataIndex: 'login',
            key: 'login',
            width: '30%',
            ...getColumnSearchProps('login'),
        },
        {
            title: 'language',
            dataIndex: 'language',
            key: 'language',
            width: '20%',
            ...getColumnSearchProps('language'),
        },
        {
            title: 'stargazers_count',
            dataIndex: 'stargazers_count',
            key: 'stargazers_count',
            ...getColumnSearchProps('stargazers_count'),
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: (
                <span className='roles-actions-header'>
                    Actions
                    <i className='fas fa-plus' onClick={() => console.log('action 1')} />
                </span>
            ),
            width: '5%',
            dataIndex: 'details',
            key: 'details',
            render: (text: any) => text,
        },
    ];

    return <Table pagination={{pageSize: 5}}columns={columns} dataSource={props.repos} />;
};

export default TableComponent;
