import React from 'react';

const AuthContext = React.createContext({
    email: "",
    password: "",
    setEmail: (value: React.SetStateAction<string>) => {},
    setPassword: (value: React.SetStateAction<string>) => {},
});

export default AuthContext;