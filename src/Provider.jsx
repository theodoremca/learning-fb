import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { createContext} from 'react';
import { auth } from './firebaseUtils';

export const AuthContext = createContext({});

export const   AuthProvider = ({children}) => {
    const [loggedIn,setLoggedIn] = useState(false);
    const [appLoading,setAppLoading] = useState(true);
    const [authUser,setAuthUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("Auth state changed");
            if (user) {
              const uid = user.uid;
              console.log({uid});
              console.log({user});
              setAuthUser(user);
              const token = await user.getIdToken();
            } else {
                setAuthUser({});
              console.log("Sign-out successful");
            }
            setAppLoading(false);
          });
    },[])


    const body = {
        loggedIn,
        appLoading,
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