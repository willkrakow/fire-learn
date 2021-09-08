import { getFirestore } from 'firebase/firestore'
import { getApp } from 'firebase/app'

const useDb = () => {
    const app = getApp()
    const db = getFirestore(app)

    return db
}


export default useDb