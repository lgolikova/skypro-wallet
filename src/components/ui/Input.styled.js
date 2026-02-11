import styled, { css } from "styled-components";

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    max-width: 313px;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const LabelWrapper = styled.label`
    font-size: 12px;
    color: black;
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const InputContainer = styled.div`
    position: relative;
`;

export const SInput = styled.input`
    width: 100%;
    max-width: 343px;
    height: 39px;
    padding: 12px;
    border-radius: 6px;
    font-size: 12px;
    color: black;
    border: 1px solid #999999;
    outline: none;

    ${({ $error }) =>
        $error &&
        css`
            border-color: #f25050;
            background-color: #ffebeb;
        `}

    ${({ $valid }) =>
        $valid &&
        css`
            border-color: #1fa46c;
            background-color: #dbffe9;
        `}

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const Star = styled.span`
    color: red;
    font-size: 16px;
`;

export const StarInside = styled(Star)`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;
