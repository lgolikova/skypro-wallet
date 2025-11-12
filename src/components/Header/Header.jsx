import React from "react";
import { Link } from "react-router-dom";
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
                    <SLogoutBtn>Выйти</SLogoutBtn>
                </SHeaderBlock>
            </SContainer>
        </SHeader>
    );
};

export default Header;
