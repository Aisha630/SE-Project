import { createContext, useReducer } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user : action.payload.username, token: action.payload.token, status: 'succeeded', error: null }
        case 'LOGOUT':
            return { user: null, token: null, status: 'idle', error: null }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
        user: null, 
        token: null, 
        status: 'idle', 
        error: null 
    })

    console.log('AuthProvider state:', state)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}