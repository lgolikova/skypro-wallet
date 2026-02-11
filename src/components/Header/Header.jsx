import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SContainer from "../Container.styled";
import {
    SHeader,
    SHeaderBlock,
    SHeaderLogo,
    SHeaderNav,
    SHeaderNavBtn,
    SLogoutBtn,
    SMobileSwitch,
    SMobileBtn,
    SMobileCaret,
    SMobileMenu,
    SMobileItem,
} from "./Header.styled";

const Header = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const btnRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const currentTitle = (() => {
        if (location.pathname === "/spend-analysis") return "Анализ расходов";
        if (location.pathname === "/new") return "Новый расход";
        return "Мои расходы";
    })();

    useEffect(() => {
        const onDocClick = (e) => {
            if (!isMenuOpen) return;
            if (menuRef.current?.contains(e.target)) return;
            if (btnRef.current?.contains(e.target)) return;
            setIsMenuOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [isMenuOpen]);

    useEffect(() => {
        const onEsc = (e) => e.key === "Escape" && setIsMenuOpen(false);
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

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

                    <SMobileSwitch>
                        <SMobileBtn
                            ref={btnRef}
                            aria-haspopup="listbox"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((v) => !v)}
                        >
                            {currentTitle}
                        </SMobileBtn>
                        <SMobileCaret>▾</SMobileCaret>

                        {isMenuOpen && (
                            <SMobileMenu ref={menuRef}>
                                <SMobileItem
                                    $active={location.pathname === "/"}
                                    onClick={() => navigate("/")}
                                >
                                    Мои расходы
                                </SMobileItem>

                                <SMobileItem
                                    $active={location.pathname === "/spend/new"}
                                    onClick={() => navigate("/spend/new")}
                                >
                                    Новый расход
                                </SMobileItem>

                                <SMobileItem
                                    $active={
                                        location.pathname === "/spend-analysis"
                                    }
                                    onClick={() => navigate("/spend-analysis")}
                                >
                                    Анализ расходов
                                </SMobileItem>
                            </SMobileMenu>
                        )}
                    </SMobileSwitch>

                    <SLogoutBtn onClick={handleLogout}>Выйти</SLogoutBtn>
                </SHeaderBlock>
            </SContainer>
        </SHeader>
    );
};

export default Header;
