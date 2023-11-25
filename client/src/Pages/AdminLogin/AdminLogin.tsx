import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./styles.css"
import TextInput from "../../Components/TextInput";
import SimpleButton from "../../Components/SimpleButton";
import {login} from "../../Helpers/ApiHelper";
import toast from "react-hot-toast";

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        if (!username.trim()) {
            toast.error("Please enter a username");
            return;
        }

        if (!password.trim()) {
            toast.error("Please enter a password");
            return;
        }

        const loadingToast = toast.loading('Logging in...');
        let res = await login(username, password)

        toast.remove(loadingToast);
        if (res.status === 200) {
            localStorage.setItem("authToken", res.data)
            navigate('/admin')
        } else {
            toast.error("An error occurred! Please try again.")
        }
    };

    return (
        <div className='main-container'>
            <div className="login-container">
                <h1 className={'login-heading'}>Login</h1>
                <TextInput placeholder={"Username"}
                           onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
                />
                <TextInput placeholder={"Password"} toggleVisible style={{marginTop: 10}}
                           onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                />
                <SimpleButton label={"Login"} onClick={handleLoginClick} />
            </div>
        </div>
    )
}

export default AdminLogin