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

declare type MyAuthState = [
    user: User | null,
    loading: boolean,
    error: AuthError | null,
]

declare interface UserMetadata {
    createdAt: string;
    lastLoginAt: string;
}

declare interface DumbDate {
    seconds: number;
    nanoseconds: number;
}

declare interface UserDocument {
    bio: string;
    id: number | string;
    name: string;
    email: string;
    photoURL: string;
    created_at: DumbDate
    update_at: DumbDate
    birthdate: DumbDate
}

declare interface Course {
    id: string;
    author: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    organization: string;
    published: boolean;
}

declare namespace NSAuthContext {
}

declare interface IAuthContext {
  currentUser: User;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  updateUserName: (displayName: string) => Promise<void>;
  updateUserPhoto: (photoURL: string) => Promise<void>;
}


declare interface IUploadFile {
  file: File;
  path: string;
}

declare interface IStorageContext {
  uploadFile: ({file, path}: IUploadFile) => Promise<UploadResult>;
  uploadText: (text: string, path: string) => Promise<UploadResult>;
  downloadFile: (path: string) => Promise<string>;
}

declare interface IEnrollment {
  enrolled_at: Timestamp;
  course_id: number;
  user_id: number;
  progress: number;
  course: Course;
  user: UserDocument;
}

declare type Enrollment = IEnrollment & QuerySnapshot<DocumentData>


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