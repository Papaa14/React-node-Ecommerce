import React, { createContext, useEffect ,useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const savedLoggedIn = localStorage.getItem("isUserLogged");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

  // const isTokenValid = (serverToken) => {
  //   return token === serverToken;
  // };


  const handleLoginToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
    setIsUserLogged(true);
  };

  const handleLogout = () => {
    setIsUserLogged(false);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (savedLoggedIn === "true" && token) {
      setIsUserLogged(true);
    }
  }, [savedLoggedIn, token]);

  return (
    <AppContext.Provider
      value={{
        isUserLogged,
        setIsUserLogged,
        token,
        handleLogout,
        handleLoginToken,
        cartItems,
        setCartItems,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };