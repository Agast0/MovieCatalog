import React, {ChangeEventHandler, useState} from 'react';
import './styles.css';
import { IconButton } from '@mui/material';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const TextInput = ({ placeholder, onChange, toggleVisible, ...rest }: any) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="text-input-container">
            <input
                type={toggleVisible ? (showPassword ? 'text' : 'password') : 'text'}
                placeholder={placeholder}
                onChange={onChange}
                {...rest}
            />
            {toggleVisible && (
                <IconButton
                    className="password-toggle-button"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </IconButton>
            )}
        </div>
    );
};

export default TextInput;