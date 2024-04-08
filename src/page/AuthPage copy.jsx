import { useContext, useState } from "react";
import { logIn, logOut, logWithGoogle, signUp } from "./../firebaseUtils";
import { AuthContext } from "../Provider";

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const { authUser,appLoading } = useContext(AuthContext);
  if(appLoading) return <>Loading...</>
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-200">
        <div className="flex flex-col space-y-2">
          <div> {authUser?.email}</div>
          {authUser?.email ? (
            <button className="btn" onClick={() => logOut()}>
              {" "}
              Sign Out
            </button>
          ) : (
            <div>
              <div>Sign Up</div>
              <input
                className="input"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="email"
              />
              <input className="input" type="text" placeholder="password" />

              <button className="btn" onClick={() => signUp(email, "password")}>
                {" "}
                Sign Up Email Password
              </button>
              <button className="btn" onClick={() => logIn(email, "password")}>
                {" "}
                Sign In with Email Password
              </button>
              <button className="btn" onClick={() => logWithGoogle()}>
                {" "}
                SignIn With Google
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
