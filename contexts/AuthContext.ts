import React from 'react';

const AuthContext = React.createContext({
    email: "",
    setEmail: (value: React.SetStateAction<string>) => {},
    password: "",
    setPassword: (value: React.SetStateAction<string>) => {},
    userToken: null as string | null,
    setUserToken: (previouseState: string | null) => {},
});

export default AuthContext;