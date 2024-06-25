// middleware/auth.js
export default function ({ store, redirect, $firebase }) {
  const { auth } = $firebase
  auth.onAuthStateChanged(user => {
    if (!user) {
      // User is not logged in, redirect to login page
      return redirect('/login')
    }
  })
}
