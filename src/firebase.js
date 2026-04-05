import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAfw1RTS2Xq9CNjGHYnXgcCq30UBig7KxA",
  authDomain: "buddy-72fba.firebaseapp.com",
  projectId: "buddy-72fba",
  storageBucket: "buddy-72fba.firebasestorage.app",
  messagingSenderId: "882410158536",
  appId: "1:882410158536:web:4847265597cb347f8ba8fd"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
