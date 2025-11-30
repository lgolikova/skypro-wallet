import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
    const usersFromLS = () => {
        try {
            return window.localStorage.getItem("userInfo")
                ? JSON.parse(window.localStorage.getItem("userInfo"))
                : null;
        } catch {
            return null;
        }
    };

    const [user, setUser] = useState(usersFromLS());

    const updateUserInfo = (userData) => {
        setUser(userData);

        if (userData) {
            localStorage.setItem("userInfo", JSON.stringify(userData));
        } else {
            localStorage.removeItem("userInfo");
        }
    };

    const login = (userLogin) => {
        console.log("userBefore", user);
        updateUserInfo(userLogin);
        console.log("userAfter", user);
        return true;
    };

    const logout = () => {
        updateUserInfo(null);
        return true;
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
