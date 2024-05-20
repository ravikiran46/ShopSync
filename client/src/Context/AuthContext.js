import { createContext , React, useState} from 'react'

export const  AuthenticationContext = createContext();

export const AuthProvider =({children}) =>{

    const [auth , setauth] = useState({});

    return (
        <AuthenticationContext.Provider value = {{auth, setauth}}>
            {children}
        </AuthenticationContext.Provider>
    )
 }