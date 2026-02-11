import styled from "styled-components";

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 379px;
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 32px;
    border-radius: 16px;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
`;

export const ErrorMessage = styled.div`
    color: #f84d4d;
    font-size: 12px;
    line-height: 150%;
    margin-top: 12px;
    letter-spacing: -1%;
`;

export const SwitchText = styled.div`
    font-size: 12px;
    color: #000;
    margin-top: 12px;
    text-align: center;
    line-height: 150%;
    color: #999999;

    a {
        color: #999999;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
        text-decoration: underline;
        margin-top: 4px;
        line-height: 150%;
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 12px;
`;
