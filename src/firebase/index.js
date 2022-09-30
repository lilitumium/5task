import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const usersTable = 'users';
const messagesTable = 'messages';

const firebaseConfig = {
  apiKey: "AIzaSyB-nbt1ujjssUXXBeOV4fRqIAhzYEVcjd8",
  authDomain: "anon-chat-app-c788f.firebaseapp.com",
  projectId: "anon-chat-app-c788f",
  storageBucket: "anon-chat-app-c788f.appspot.com",
  messagingSenderId: "721334184442",
  appId: "1:721334184442:web:7653fdb22bd2e4cfcbdc43"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(firebaseApp);

export {
  firebaseApp,
  firestoreDB,
  usersTable,
  messagesTable
};