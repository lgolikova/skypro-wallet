import React from "react";
import styled, { css } from "styled-components";

const SInput = styled.input`
    width: 100%;
    max-width: 343px;
    height: 39px;
    padding: 12px;
    border-radius: 6px;
    font-size: 12px;
    color: black;
    border: 1px solid #999999;

    ${({ error }) =>
        error &&
        css`
            border-color: #f25050;
            background-color: #f25050;
        `}

    ${({ valid }) =>
        valid &&
        css`
            border-color: none;
            background-color: #1fa46c;
        `}
`;

const Star = styled.span`
    color: red;
    font-size: 16px;
`;

const StarInside = styled(Star)`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;

export const BaseInput = ({
    label,
    value,
    onChange,
    error,
    valid,
    mode = "spend",
    placeholder,
    type = "text",
}) => {
    return (
        <SInput
            type={type}
            value={value}
            onChange={onChange}
            error={error}
            valid={!error && valid}
            placeholder={placeholder}
        />
    );
};
