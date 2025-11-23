import React, { useState } from "react";
import { AuthForm } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import SGlobalWrapper from "../components/GlobalWrapper.styled";
import styled from "styled-components";
import SContainer from "../components/Container.styled";
import { Link } from "react-router-dom";
import { SHeaderLogo } from "../components/Header/Header.styled";
import { SHeaderBlock } from "../components/Header/Header.styled";

const AuthFormWrapper = styled.div`
    display: flex;
    padding-top: 169px;
`;

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <SContainer>
                <SHeaderBlock>
                    <Link to="/">
                        <SHeaderLogo
                            src="../../src/assets/icons/logo.svg"
                            alt="logo"
                        />
                    </Link>
                </SHeaderBlock>
            </SContainer>
            <SGlobalWrapper>
                <AuthFormWrapper>
                    <AuthForm
                        mode="login"
                        onSwitchMode={() => navigate("/register")}
                    />
                </AuthFormWrapper>
            </SGlobalWrapper>
        </div>
    );
};

export default LoginPage;
