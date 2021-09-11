import React from 'react'
import { getStorage, ref, getDownloadURL, uploadBytes, UploadResult, uploadString } from "firebase/storage";


export const StorageContext= React.createContext<IStorageContext | null>(null)

export const useStorage = () => React.useContext(StorageContext)


export const StorageProvider: React.FC = ({ children }) => {
    const storage = getStorage()

    const uploadFile = async ({file, path}: IUploadFile): Promise<UploadResult> => {
        const storageRef = ref(storage, path)
        const uploadTask = await uploadBytes(storageRef, file)
        return uploadTask
    }

    const uploadText = async (text: string, path: string): Promise<UploadResult> => {
        const storageRef = ref(storage, path)
        const uploadTask = await uploadString(storageRef, text)
        return uploadTask
    }

    const downloadFile = async (path: string): Promise<string> => {
        const storageRef = ref(storage, path)
        const downloadURL = await getDownloadURL(storageRef)
        return downloadURL
    }

    const value = {
        uploadFile,
        uploadText,
        downloadFile
    }
    return (
        <StorageContext.Provider value={value} >
            {children}
        </StorageContext.Provider>
    )
}