import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./styles.css"
import TextInput from "../../Components/TextInput";
import SimpleButton from "../../Components/SimpleButton";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {

    };

    return (
        <div className='main-container'>
            <div className="login-container">
                <h1 className={'login-heading'}>Login</h1>
                <TextInput placeholder={"Username"}
                           onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
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