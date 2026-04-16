import React from "react";

const SettingsContext = React.createContext({
    darkModeUsage: false,
    setDarkModeUsage: (value: React.SetStateAction<boolean>) => {},
});

export default SettingsContext;