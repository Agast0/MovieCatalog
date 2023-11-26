import React, {useEffect, useState} from 'react';
import './styles.css';
import {useNavigate} from "react-router-dom";
import TextInput from "../TextInput";
import SimpleButton from "../SimpleButton";
import toast from "react-hot-toast";
import {handleCreateUser, handleDeleteUser, handleGetAllUsers, login} from "../../Helpers/ApiHelper";
import {RiDeleteBin5Fill} from "react-icons/ri";
import {Skeleton} from "@mui/material";

const AdminPanelUsersContent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        handleGetUsers()
    }, [])

    const deleteUser = async (username: string) => {
        const loadingToast = toast.loading('Deleting User...');
        let res = await handleDeleteUser(username)

        toast.remove(loadingToast)
        if (res.status === 200) {
            toast.success('User Deleted Successfully')
            handleGetUsers();
        } else if (res.status === 403) {
            toast.error("Please log in!")
            navigate('/admin-login')
        } else {
            toast.error('An error occurred! Please try again later.')
        }
    }

    const handleGetUsers = async () => {
        try {
            setLoadingUsers(true);
            let res = await handleGetAllUsers();

            if (res.status === 200) {
                setUsers(res.data);
            } else if (res.status === 403) {
                toast.error("Please log in!");
                navigate('/admin-login');
            } else {
                toast.error('An error occurred getting users, please try again.');
            }
        } finally {
            setLoadingUsers(false);
        }
    }

    const handleCreateNewAdminUserClick = async () => {
        if (!username.trim()) {
            toast.error("Please enter a username");
            return;
        }

        if (!password.trim()) {
            toast.error("Please enter a password");
            return;
        }

        const loadingToast = toast.loading('Creating New User...');
        let res = await handleCreateUser(username, password)
        handleGetUsers();

        toast.remove(loadingToast);
        if (res.status === 200) {
            toast.success("New user created successfully!")
        } else if (res.status === 403) {
            toast.error("Please log in!")
            navigate('/admin-login')
        } else if (res.status === 400) {
            if (typeof res.data === 'object') {
                Object.keys(res.data).forEach((key) => {
                    toast.error(res.data[key]);
                });
            } else if (typeof res.data === 'string') {
                toast.error(res.data);
            }
        } else {
            toast.error("An error occurred! Please try again.")
        }
    }

    return (
        <div className={'user-container'}>
            <div className={'create-new-admin'}>
                <TextInput placeholder={"Username"} style={{marginRight: '20px'}}
                           onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
                />
                <TextInput placeholder={"Password"} toggleVisible
                           onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                />
                <SimpleButton label={"Create New Admin User"} width={200} isWide isBold style={{marginLeft: '20px'}}
                              onClick={handleCreateNewAdminUserClick} />
            </div>
            <div className={'users-display-container'}>
                {loadingUsers ? (
                    <Skeleton height={80} />
                ) : (
                    users.map((user: { username: string }, index: number) => (
                        <div key={user.username} className={`user-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
                            {user.username}
                            {user.username !== 'admin' ? (
                                <RiDeleteBin5Fill className={'delete-button'} onClick={() => { deleteUser(user.username) }} size={20} />
                            ) : (
                                <div />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPanelUsersContent;
