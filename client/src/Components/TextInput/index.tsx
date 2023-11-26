import React, { ChangeEventHandler, useState } from 'react';
import './styles.css';
import { IconButton } from '@mui/material';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const TextInput = ({ placeholder, onChange, toggleVisible, isWide, isTall, value, ...rest }: any) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputClassName = `${isWide ? 'wide' : ''} ${isTall ? 'tall' : ''}`;

    return (
        <div className="text-input-container">
            {isTall ? (
                <textarea
                    placeholder={placeholder}
                    onChange={onChange}
                    className={inputClassName}
                    value={value}
                    {...rest}
                />
            ) : (
                <input
                    type={toggleVisible ? (showPassword ? 'text' : 'password') : 'text'}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={inputClassName}
                    value={value}
                    {...rest}
                />
            )}
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
