/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import './App.css'
import app from "./firebase/firebase.init";
import { useState } from "react";
const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({})
  
  const googleProvider =  new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleLogin =() => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error => {
      console.log(error);
    })
  }
 const handleGithubLogin = () => {
  signInWithPopup(auth, githubProvider)
  .then(result => {
    const user = result.user;
    setUser(user);
    console.log(user);

  })
  .catch(error => {
    console.log('error',error);
  })
 }

 const handleSignOut = () =>{
  signOut(auth)
  .then(() =>{
    setUser({})

  })
  .catch((error)=>{
    setUser({})
    console.log('error Sign Out', error);
  })
 }
  return (
    <>
      <div>
        {user.uid ? <button onClick={handleSignOut}>Sign Out</button>
          : <>
           <button onClick={handleGoogleLogin}>Sign in with Google</button>
        
        <button onClick={handleGithubLogin}>Sign in with Github</button>
          </>
        }
      
        
        {
           user.uid && <div>
            <h1>Name: {user.displayName}</h1>
            <h4>Email: {user.email}</h4>
            <img src={user?.photoURL} alt="user photo" />
          </div>
        }
      </div>
    </>
  )
}

export default App;
