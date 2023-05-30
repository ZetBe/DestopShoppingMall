import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyANEDqYn6nLqfZp6Ss7J_FbWVuVHz3mFRI',
  authDomain: 'watercommunity-43dcf.firebaseapp.com',
  databaseURL: 'https://watercommunity-43dcf-default-rtdb.firebaseio.com',
  projectId: 'watercommunity-43dcf',
  storageBucket: 'watercommunity-43dcf.appspot.com',
  messagingSenderId: '1062728180040',
  appId: '1:1062728180040:web:27fd90e397b66d112fd37d',
  measurementId: 'G-QCKPKBLNF3',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
