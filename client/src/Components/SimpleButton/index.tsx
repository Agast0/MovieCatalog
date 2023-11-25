import React from 'react';
import { ButtonBase } from '@mui/material';
import "./styles.css"
const SimpleButton = ({ onClick, label, ...rest }: any) => {
    return (
        <ButtonBase className={`simple-button`} onClick={onClick} {...rest}>
            {label}
        </ButtonBase>
    );
};

export default SimpleButton;