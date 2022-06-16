import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { setToken, clearToken, getToken } from "../service/localStorage";


const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [errorLogin, setErrorLogin] = useState('')

    useEffect(() => {
        if(getToken()){
            axios.get('/users/me').then(res => {setUser(res.data.user)}).catch(err => console.log(err))
        }
    },[])

    const login = async (email, password) => {
        try {
            const res = await axios.post('/users/login', {
                email,
                password
            });
            setToken(res.data.token);
            setUser(res.data.user)
            console.log(res)
        } catch (err) {
            console.log(err)
            setErrorLogin(err.response.data.message)
        }
    };

    const logOut = () => {
        clearToken()
        setUser(null)
    }

    const updateUser = (value) => {
        setUser(prev => ({...prev, ...value}))
    }

    return <AuthContext.Provider value={{ user, login, logOut, errorLogin, setErrorLogin , updateUser}} >
        {children}
    </AuthContext.Provider>
}

export { AuthContext }

export default AuthContextProvider;