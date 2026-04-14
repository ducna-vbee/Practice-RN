import React from 'react';

const ThemeContext = React.createContext({
    color: '#FFFFFF',
    setColor: (value: React.SetStateAction<string>) => {},
    tabBarHiddenState: false,
    setTabBarHiddenState: (value: React.SetStateAction<boolean>) => {},
});

export default ThemeContext;