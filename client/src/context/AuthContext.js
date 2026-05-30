import { createContext } from 'react';

export const AuthContext = createContext({
    user: null,
    loading: true,
    register: async () => { },
    login: async () => { },
    loginWithGoogle: async () => { },
    logout: async () => { },
});
