import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const UserProfileProvider = ({ children }) => {
  const [token, setToken] = useState("");  
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};


export const UserProfileContext = () => useContext(UserContext);

export default UserProfileContext;
