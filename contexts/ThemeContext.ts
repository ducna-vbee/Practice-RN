import React from 'react';

const ThemeContext = React.createContext({
    color: '#FFFFFF',
    setColor: (value: React.SetStateAction<string>) => {},
});

export default ThemeContext;