import React from 'react'
import {initializeApp} from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './config/firebaseConfig'

const app = initializeApp(firebaseConfig)


export default app