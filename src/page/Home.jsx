import { useContext} from "react";

import { AuthContext } from "../Provider";

export const HomePage = () => {

  const { authUser,appLoading } = useContext(AuthContext);
  if(appLoading) return <>Loading...</>
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-slate-200">
          <div className="text-4xl font-extrabold">Home Page</div>
          <div className="l"> {authUser?.email}</div>
      </div>
    </>
  );
};
