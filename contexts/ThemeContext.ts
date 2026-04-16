import { Colors } from '@/constants/theme';
import React from 'react';

const ThemeContext = React.createContext({
    backgroundColor: Colors.light.background,
    setBackgroundColor: (value: React.SetStateAction<string>) => {},
    textColor: Colors.light.text,
    setTextColor: (value: React.SetStateAction<string>) => {},
    tabBarHiddenState: false,
    setTabBarHiddenState: (value: React.SetStateAction<boolean>) => {},
});

export default ThemeContext;