import styled from "styled-components";
import { Link } from "react-router-dom";

export const SHeader = styled.header`
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
`;

export const SHeaderBlock = styled.div`
    height: 64px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
`;

export const SHeaderLogo = styled.img`
    width: 144px;
    height: 19px;
`;

export const SHeaderNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
`;

export const SHeaderNavBtn = styled(Link)`
    color: #000;
    font-size: 14px;
    line-height: 1.7;
    transition: color 0.3s ease;

    &:hover {
        color: #1fa46c;
        font-weight: 600;
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 5px;
    }
`;

export const SLogoutBtn = styled.button`
    background: none;
    border: none;
    color: #000;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
        color: #1fa46c;
    }
`;
