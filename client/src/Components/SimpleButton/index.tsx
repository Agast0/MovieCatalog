import React from 'react';
import { ButtonBase } from '@mui/material';
import "./styles.css"
const SimpleButton = ({ onClick, label, isWide, isBold, ...rest }: any) => {
    const buttonClass = `simple-button ${isBold ? 'bold-text' : ''} ${isWide ? 'wide' : ''}`;

    return (
        <ButtonBase className={buttonClass} onClick={onClick} {...rest}>
            {label}
        </ButtonBase>
    );
};

export default SimpleButton;