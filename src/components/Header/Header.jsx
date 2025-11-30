import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SContainer from "../Container.styled";
import {
    SHeader,
    SHeaderBlock,
    SHeaderLogo,
    SHeaderNavBtn,
    SHeaderNav,
    SLogoutBtn,
} from "./Header.styled";

const Header = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <SHeader>
            <SContainer>
                <SHeaderBlock>
                    <Link to="/">
                        <SHeaderLogo
                            src="../../src/assets/icons/logo.svg"
                            alt="logo"
                        />
                    </Link>

                    <SHeaderNav>
                        <SHeaderNavBtn to="/">Мои расходы</SHeaderNavBtn>
                        <SHeaderNavBtn to="/spend-analysis">
                            Анализ расходов
                        </SHeaderNavBtn>
                    </SHeaderNav>
                    <SLogoutBtn onClick={handleLogout}>Выйти</SLogoutBtn>
                </SHeaderBlock>
            </SContainer>
        </SHeader>
    );
};

export default Header;
