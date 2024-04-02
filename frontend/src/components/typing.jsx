import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const TypingEffect = ({ text, speed = 80 }) => {
    const [visibleText, setVisibleText] = useState('');

    useEffect(() => {
        if (visibleText.length < text.length) {
            const timer = setTimeout(() => {
                setVisibleText(text.substr(0, visibleText.length + 1));
            }, speed);

            return () => clearTimeout(timer);
        }
    }, [visibleText, text, speed]);

    return (
        <Typography color="white" sx={{ fontSize: "30px", maxWidth: "50%" }} className="typing-effect">
            {visibleText}
        </Typography>
    );
};

export default TypingEffect;
