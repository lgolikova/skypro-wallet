import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { usersFromLS } from "../utils/usersFromLS";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(usersFromLS());
    const [token, setToken] = useState(usersFromLS()?.token || "");


    const updateUserInfo = (userData) => {
        setUser(userData);

        if (userData) {
            localStorage.setItem("userInfo", JSON.stringify(userData));
        } else {
            localStorage.removeItem("userInfo");
        }
    };

    const login = (userLogin) => {
        updateUserInfo(userLogin);
        setToken(tokenFromLS.token);
        return true;
    };

    const logout = () => {
        updateUserInfo(null);
        return true;
    };
    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
