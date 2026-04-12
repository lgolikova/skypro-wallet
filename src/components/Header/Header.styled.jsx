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
    position: relative;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
`;

export const SHeaderLogo = styled.img`
    width: 144px;
    height: 19px;

    @media (max-width: 768px) {
        width: 109px;
        height: 14px;
    }
`;

export const SHeaderNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const SHeaderNavBtn = styled(Link)`
    color: #000;
    font-size: 14px;
    line-height: 1.7;
    transition: color 0.3s ease, font-weight 0.3s ease;

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
    cursor: pointer;

    &:hover {
        color: #1fa46c;
    }

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const SMobileSwitch = styled.div`
    display: none;
    align-items: center;
    gap: 6px;
    position: relative;

    @media (max-width: 768px) {
        display: flex;
    }
`;

export const SMobileBtn = styled.button`
    background: none;
    border: none;
    font-size: 12px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    cursor: pointer;
    color: #1fa46c;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
`;

export const SMobileCaret = styled.span`
    font-size: 12px;
    user-select: none;
`;

export const SMobileMenu = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    min-width: 138px;
    z-index: 10;
    gap: 6px;

    @media (min-width: 769px) {
        display: none;
    }
`;

export const SMobileItem = styled.button`
    width: max-content;
    padding: 10px 16px;
    background: ${({ $active }) => ($active ? "#DBFFE9" : "#F4F5F6")};
    color: ${({ $active }) => ($active ? "#1FA46C" : "#000")};
    border-radius: 16px;
    border: 1px solid transparent;
    text-align: left;
    font-size: 10px;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    transition: background 0.2s ease;
    display: inline-block;

    &:hover {
        background: #dbffe9;
    }
`;
