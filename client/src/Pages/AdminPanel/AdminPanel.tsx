import React, {useEffect, useState} from 'react';
import './styles.css';
import {handleGetUsernameFromToken} from "../../Helpers/ApiHelper";
import {useNavigate} from "react-router-dom";
import AdminPanelUsersContent from "../../Components/AdminPanelUsersContent";
import AdminPanelMoviesContent from "../../Components/AdminPanelMoviesContent";

const AdminPanel = () => {
    const [selectedTab, setSelectedTab] = useState('Movies');
    const [username, setUsername] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        let verifyAuthToken = async () => {
            let res = await handleGetUsernameFromToken()

            if (res.status === 403) {
                navigate('/admin-login')
            } else if (res.status === 200) {
                setUsername(res.data)
            } else {
                console.log(`An error occurred: ${res}`)
            }
        }

        verifyAuthToken();
    }, [])

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
                {selectedTab === 'Movies' && <AdminPanelMoviesContent />}
                {selectedTab === 'Users' && <AdminPanelUsersContent />}
            </div>
        </div>
    );
};

export default AdminPanel;
