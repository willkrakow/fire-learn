import React from 'react'
import {initializeApp} from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './config/firebaseConfig'

const app = initializeApp(firebaseConfig)
//@ts-ignore
export const auth = app.auth()


export default app