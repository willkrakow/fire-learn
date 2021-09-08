import React from 'react'
import { Auth } from '@firebase/auth'


export const AuthContext = React.createContext<Auth | null>(null)