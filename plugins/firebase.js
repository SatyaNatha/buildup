// plugins/firebase.js
import { defineNuxtPlugin } from '#app';
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAihucDajNx_YW7JAqtJJUGZz3bZWwFJ_0",
    authDomain: "buildup-6749d.firebaseapp.com",
    projectId: "buildup-6749d",
    storageBucket: "buildup-6749d.appspot.com",
    messagingSenderId: "301961559026",
    appId: "1:301961559026:web:6cfc7fdb92c758fa9f096b"
  };

export default defineNuxtPlugin(nuxtApp => {
    // Inisialisasi Firebase jika belum diinisialisasi
  let firebaseApp;
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }

  // Mengambil instance Auth dan Firestore
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  // Menyediakan `auth` dan `db` ke dalam konteks aplikasi Nuxt.js
  nuxtApp.provide('firebase', { auth, db });
});
