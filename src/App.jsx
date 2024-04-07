import { useState } from "react"
import { logIn, logOut, logWithGoogle, signUp } from "./firebaseUtils"


function App() {

  const [email, setEmail] = useState("")


  return (
    <>
   <div>Sign Up</div>
   <input className="input" type="text"onChange={(e)=>{setEmail(e.target.value)}}  placeholder="email" />
   <input className="input" type="text" placeholder="password" />
   <button className="btn" onClick={()=>signUp(email, "password")}> Sign Up Email Password</button>
   <button className="btn" onClick={()=>logIn(email, "password")}> Sign In with Email Password</button>
   <button className="btn" onClick={()=>logWithGoogle()}> SignIn With Google</button>
   <button className="btn" onClick={()=>logOut()}> Sign Out</button>
       
    </>
  )
}

export default App
