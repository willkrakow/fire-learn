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

interface IDocument {
  path: string;
  data: any;
}



declare type Course = {
  id: string;
  data: {
    author: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    organization: string;
    published: boolean;
    image_path: string;
    lessons: any[];
  };
};

type Lesson = {
  data: {
    title: string;
    subtitle: string;
    markdown_content: string;
    draft: boolean;
    image_path: string;
  };
  id: string;
};


declare type IAuthContext = {
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
  isAdmin: () => boolean | null;
}

declare type IGetSubCollection = {
  collectionName: string;
  collectionItem: string;
  subCollectionName: string;
}


interface IGetSubCollectionDocument {
  collectionName: string;
  collectionItem: string;
  subCollectionName: string;
  subCollectionItem: string;
}

type IQueryParams = [field: string, operator: WhereFilterOp, value: any];


interface IQuery {
  collectionPath: string;
  queryParams: IQueryParams;
}


declare type IFirestoreContext = {
  getDocument: (path: string) => Promise<any>;
  getCollection: (path: string) => Promise<any>;
  addDocument: ({ collectionPath, data }: IAddDocument) => Promise<string>;
  updateDocument: ({ path, data }: IDocument) => Promise<void>;
  deleteDocument: (path: string) => Promise<void>;
  queryDocuments: ({
    collectionPath,
    queryParams,
  }: IQuery) => Promise<{ id: string; data: any }[]>;
  getSubCollection: ({
    collectionName,
    collectionItem,
    subCollectionName,
  }: IGetSubCollection) => Promise<any>;
  getSubCollectionDocument: ({
    collectionName,
    collectionItem,
    subCollectionName,
    subCollectionItem,
  }: IGetSubCollectionDocument) => Promise<any>;
}


declare type IUploadFile = {
  file: File;
  path: string;
  image?: boolean;
}

declare type IStorageContext = {
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