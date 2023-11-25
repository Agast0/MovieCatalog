import React, { useState } from 'react';
import './styles.css';

const AdminPanel = () => {
    const [selectedTab, setSelectedTab] = useState('Movies');

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <div className={'main-container'}>
            <div className={'panel-tabs'}>
                <div
                    className={`tab ${selectedTab === 'Movies' ? 'selected-tab' : ''}`}
                    onClick={() => handleTabClick('Movies')}
                >
                    Movies
                </div>
                <div
                    className={`tab ${selectedTab === 'Users' ? 'selected-tab' : ''}`}
                    onClick={() => handleTabClick('Users')}
                >
                    Users
                </div>
            </div>
            <div className={'panel-container'}>
                {selectedTab === 'Movies' && <div>Movies Content</div>}
                {selectedTab === 'Users' && <div>Users Content</div>}
            </div>
        </div>
    );
};

export default AdminPanel;
