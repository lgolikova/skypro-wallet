import React from "react";
import styled, { css } from "styled-components";

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    max-width: 313px;
`;

const LabelWrapper = styled.label`
    font-size: 12px;
    color: black;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const InputContainer = styled.div`
    position: relative;
`;

const SInput = styled.input`
    width: 100%;
    max-width: 343px;
    height: 39px;
    padding: 12px;
    border-radius: 6px;
    font-size: 12px;
    color: black;
    border: 1px solid #999999;
    outline: none;

    ${({ error }) =>
        error &&
        css`
            border-color: #f25050;
            background-color: #ffebeb;
        `}

    ${({ valid }) =>
        valid &&
        css`
            border-color: #1fa46c;
            background-color: #dbffe9;
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
        <InputWrapper>
            {label && mode === "spend" && (
                <LabelWrapper>
                    {label}
                    {error && <Star>*</Star>}
                </LabelWrapper>
            )}
            <InputContainer>
                <SInput
                    type={type}
                    value={value}
                    onChange={onChange}
                    error={error}
                    valid={!error && valid}
                    placeholder={placeholder}
                />
                {mode === "login" && error && <StarInside>*</StarInside>}
            </InputContainer>
        </InputWrapper>
    );
};
