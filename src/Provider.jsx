import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { createContext} from 'react';
import { auth } from './firebaseUtils';

export const AuthContext = createContext({});

export const   AuthProvider = ({children}) => {
    const [loggedIn,setLoggedIn] = useState(false);
    const [authUser,setAuthUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("Auth state changed");
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              console.log({uid});
              console.log({user});
              setAuthUser(user);
              const token = await user.getIdToken();
              // ...
            } else {
                setAuthUser({});
              // User is signed out
              // ...
              console.log("Sign-out successful");
            }
          });
    },[])


    const body = {
        loggedIn,
        setLoggedIn,
        authUser,setAuthUser
    }
    return (
        <>
    
             <AuthContext.Provider value={body}>
            {children}
        </AuthContext.Provider>
        </>
   
    )
}