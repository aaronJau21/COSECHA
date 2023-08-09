import { FC, ReactNode, createContext, useContext, useState } from "react"

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext({
    isAuthenticated: false
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return <AuthContext.Provider value={{
        isAuthenticated,
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)