import { createContext, useContext } from "react";

export const ACTIONS = {
    LOGIN: 'login',
    LOGOUT: 'logout'
}
const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

