import React, {createContext, useState} from "react";
import {defaultLoggedUser, LoggedUser} from "../../../services/connectors/axios";
import {useLocation} from "react-router-dom";


export const useAuthContext = createContext({
  loggedUser: defaultLoggedUser,
  setLoggedUser: (state: LoggedUser) => {
  },
});

export function AuthProvider(props: { children?: React.ReactNode }) {
  const [loggedUser, setLoggedUser] = useState(defaultLoggedUser)
  const loginValue = {loggedUser, setLoggedUser}
  return (
    <useAuthContext.Provider value={loginValue}>
      {props.children}
    </useAuthContext.Provider>
  );
}

export const useAuth = () => {
  return React.useContext(useAuthContext);
}

export const RequireAuth = ({children}: { children: JSX.Element }) => {
  let {loggedUser, setLoggedUser} = useAuth();
  let location = useLocation();

  /*useEffect(() => {
    const sessionUser: LoggedUser = JSON.parse(sessionStorage.getItem("auth"))
    if (sessionUser) setLoggedUser(sessionUser);
  }, [])*/

  /*if (!loggedUser.isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }*/

  return children;
}