import { useState, useEffect } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { DEFAULT_DATA } from '../data.js'

const DOC_REF = doc(db, 'appData', 'main')

export function useAppData() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // onSnapshot opens a live connection to Firestore.
    // Any time the document changes (by any user), this callback fires
    // and React re-renders with the latest data — no polling needed.
    const unsubscribe = onSnapshot(DOC_REF, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.data())
      } else {
        // First ever load — seed the database with default data
        setDoc(DOC_REF, DEFAULT_DATA)
      }
    })

    // Clean up the listener when the component unmounts
    return unsubscribe
  }, [])

  function persist(newData) {
    setDoc(DOC_REF, newData)
  }

  return { data, persist }
}
