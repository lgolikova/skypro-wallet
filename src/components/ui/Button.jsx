import React from "react";
import styled, { css } from "styled-components";

const SButton = styled.button`
    width: 100%;
    max-width: 313px;
    height: 39px;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    ${({ active }) =>
        active
            ? css`
                  background-color: #1fa46c;
                  cursor: pointer;
              `
            : css`
                  background-color: #999999;
                  cursor: not-allowed;
              `}

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const BaseButton = ({ text, active = true, onClick }) => {
    return (
        <SButton
            type="submit"
            active={active}
            onClick={onClick}
            disabled={!active}
        >
            {text}
        </SButton>
    );
};
