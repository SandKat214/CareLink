import { createContext, useEffect, useReducer } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload }
		case "LOGOUT":
			return { user: null }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	})

	const verifyUser = async (user) => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_AUTHS_API}verify/`, {
				headers: {
					Authorization: `Bearer ${user.token}`
				}
			})
			console.log('User token verified.')
			return res.data
		} catch (error) {
			console.log('Token expired or unauthorized.')
			return null
		}
	}

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))

		if (user) {
			const verify = async () => {
				const verified = await verifyUser(user)
				if (verified) {
					dispatch({ type: 'LOGIN', payload: user })
				} else {
					localStorage.removeItem('user')
					dispatch({ type: 'LOGOUT'})
				}
			}
			verify()
		}
	}, [])

	console.log("AuthContext state: ", state)

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
