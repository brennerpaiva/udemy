import { initializeApp} from 'firebase/app'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC-cN3bdCYl9gtdXTkuwd6RBTZkhsogyV4",
  authDomain: "curso-udemy-420ad.firebaseapp.com",
  projectId: "curso-udemy-420ad",
  storageBucket: "curso-udemy-420ad.appspot.com",
  messagingSenderId: "813815360194",
  appId: "1:813815360194:web:f22c7bec83967ef13ca95b",
  measurementId: "G-VQ8JZ5V941",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db } ;