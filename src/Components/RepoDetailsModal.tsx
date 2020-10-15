import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { GitForkIcon, RepoIcon, StarIcon } from '@primer/octicons-react';
import githubLangColors from '../github-lang-colors';

import { Collapse } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;

const RepoDetailsModal = (props: any) => {
    const [reposData, setReposData] = useState([]);

    const onCollapsePanelPress = (id: any) => {
        if (id === '3' && reposData.length === 0) {
            axios.get(props.visible.owner.repos_url).then(res => {
                setReposData(res.data);
            });
        }
    };

    return (
        <>
            {props.visible && (
                <Modal
                    width={window.innerWidth * 0.7}
                    okButtonProps={{ style: { display: 'none' } }}
                    title={props.visible.name.toUpperCase()}
                    visible={props.visible}
                    onOk={props.handleOk}
                    onCancel={props.handleCancel}
                >
                    <p>
                        <RepoIcon /> {props.visible.name}
                    </p>
                    <p>{props.visible.description}</p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            maxWidth: '50%',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                className='dot'
                                style={{ backgroundColor: githubLangColors[props.visible.language] }}
                            />
                            {props.visible.language}
                        </div>
                        <div>
                            <StarIcon className='icon' />
                            {props.visible.stargazers_count}
                        </div>
                        <div>
                            <GitForkIcon className='icon' />
                            {props.visible.forks}
                        </div>
                    </div>
                    <Collapse onChange={onCollapsePanelPress} style={{ marginTop: '20px' }} accordion>
                        <Panel header={props.visible.owner.type} key='1'>
                            <div>
                                <img
                                    height={'50px'}
                                    alt='avatar'
                                    className='icon'
                                    src={props.visible.owner.avatar_url}
                                />
                                {props.visible.owner.login}
                            </div>
                        </Panel>
                        <Panel header='Repo details' key='2'>
                            <p>Created: {props.visible.created_at.split('T')[0]}</p>
                            <p>Last change: {props.visible.updated_at.split('T')[0]}</p>
                            {props.visible.license && <p>License: {props.visible.license.name}</p> }
                        </Panel>
                        <Panel header={props.visible.owner.type + ' repos'} key='3'>
                            {reposData.map((data: any) => {
                                return (
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '5px',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div style={{flex: 3, flexWrap: "wrap"}}>{data.name}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                                <div
                                                    className='dot'
                                                    style={{ backgroundColor: githubLangColors[data.language] }}
                                                />
                                                {data.language}
                                            </div>
                                            <div style={{flex: 1}}>
                                                <StarIcon className='icon' />
                                                {data.stargazers_count}
                                            </div>
                                            <div style={{flex: 1}}>
                                                <GitForkIcon className='icon' />
                                                {data.forks}
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </Panel>
                    </Collapse>
                </Modal>
            )}
        </>
    );
};

export default RepoDetailsModal;
