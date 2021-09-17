
enum ProviderId {
    FACEBOOK = 'facebook.com',
    GOOGLE = 'google.com',
    GITHUB = 'github.com',
    EMAIL = 'password',
    TWITTER = 'twitter.com'
}

interface UserProviderData {
    displayName: string;
    email?: string;
    phoneNumber?: string;
    photoUrl?: string;
    providerId: ProviderId
}


interface AuthError {
    message: string
}

type AuthState = [
  user: User | null,
  loading: boolean,
  error: AuthError | null
];

type MyAuthState = [
    user: User | null,
    loading: boolean,
    error: AuthError | null,
]

interface UserMetadata {
    createdAt: string;
    lastLoginAt: string;
}

type DumbDate = {
    seconds: number;
    nanoseconds: number;
}

type UserDocument = {
  id: string;
  data: {
    bio: string;
    id: number | string;
    name: string;
    email: string;
    photoURL: string;
    created_at: Timestamp;
    update_at: Timestamp;
    birthdate: Timestamp;
    last_login_at?: Timestamp;
    last_login_ip?: string;
    phoneNumber?: string;
  };
}

interface IDocument {
  path: string;
  data: any;
}



type Course = {
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
    course_id: string;
    course: DocumentReference<DocumentData>
  };
  id: string;
};


type IAuthContext = {
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

type IGetSubCollection = {
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


type IFirestoreContext = {
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
  getDocumentFromReference: (
    documentRef: DocumentReference<DocumentData>
  ) => Promise<any>;
}


type IUploadFile = {
  file: File;
  path: string;
  image?: boolean;
}

type IStorageContext = {
  uploadFile: ({file, path}: IUploadFile) => Promise<UploadResult>;
  uploadText: (text: string, path: string) => Promise<UploadResult>;
  downloadFile: (path: string) => Promise<string>;
}

interface IEnrollment {
  id: string;
  data: {
    enrolled_at: Timestamp;
    course_id: string;
    user_id: string;
    userId: string;
    progress: number;
    course: Course;
    user: UserDocument;
  };
}

type Enrollment = IEnrollment & QuerySnapshot<DocumentData>


interface UserDocumentSnapshot {
    exists: boolean;
    data: UserDocument;
}

interface UserDocumentChange {
    type: 'added' | 'modified' | 'removed';
    doc: UserDocumentSnapshot;
}

interface UserDocumentChangeEvent {
    type: 'value' | 'added' | 'modified' | 'removed';
    snapshot: UserDocumentSnapshot;
}

interface UserDocumentQuery {
    get(): Promise<UserDocumentSnapshot>;
    onSnapshot(callback: (snapshot: UserDocumentChangeEvent) => void): () => void;
}

interface UserDocumentReference {
    doc(id: string): UserDocumentQuery;
}

interface UserDocumentCollection {
    doc(id: string): UserDocumentQuery;
    onSnapshot(callback: (snapshot: UserDocumentChangeEvent) => void): () => void;
}

interface UserDocumentCollectionReference {
    doc(id: string): UserDocumentQuery;
    onSnapshot(callback: (snapshot: UserDocumentChangeEvent) => void): () => void;
}
