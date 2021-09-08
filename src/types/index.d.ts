// declare interface User {
//     email: string;
//     displayName: string;
//     photoURL?: string;
//     uid: string;
//     metadata: UserMetadata;
//     providerData: UserProviderData[];
//     phoneNumber?: string;
// }

declare enum ProviderId {
    FACEBOOK = 'facebook.com',
    GOOGLE = 'google.com',
    GITHUB = 'github.com',
    EMAIL = 'password',
    TWITTER = 'twitter.com'
}

declare interface UserProviderData {
    displayName: string;
    email?: string;
    phoneNumber?: string;
    photoUrl?: string;
    providerId: ProviderId
}


declare interface AuthError {
    message: string
}

declare type AuthState = [
  user: User | null,
  loading: boolean,
  error: AuthError | null
];

declare interface UserMetadata {
    createdAt: string;
    lastLoginAt: string;
}

declare module "react-firebase-hooks"

declare interface UserDocument {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    createdAt: string;
    updatedAt: string;
    courseIds: string[];
}


declare interface UserDocumentSnapshot {
    exists: boolean;
    data: UserDocument;
}

declare interface UserDocumentData {
    name: string;
    email: string;
    photoURL: string;
    createdAt: string;
    updatedAt: string;
}

declare interface UserDocumentChange {
    type: 'added' | 'modified' | 'removed';
    doc: UserDocumentSnapshot;
}

declare interface UserDocumentChangeEvent {
    type: 'value' | 'added' | 'modified' | 'removed';
    snapshot: UserDocumentSnapshot;
}

declare interface UserDocumentQuery {
    get(): Promise<UserDocumentSnapshot>;
    onSnapshot(callback: (snapshot: UserDocumentChangeEvent) => void): () => void;
}

declare interface UserDocumentReference {
    doc(id: string): UserDocumentQuery;
}

declare interface UserDocumentCollection {
    doc(id: string): UserDocumentQuery;
    onSnapshot(callback: (snapshot: UserDocumentChangeEvent) => void): () => void;
}

declare interface UserDocumentCollectionReference {
    doc(id: string): UserDocumentQuery;
    onSnapshot(callback: (snapshot: UserDocumentChangeEvent) => void): () => void;
}