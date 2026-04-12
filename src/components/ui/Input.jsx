import React from "react";
import {
    InputWrapper,
    LabelWrapper,
    InputContainer,
    SInput,
    Star,
    StarInside,
} from "./Input.styled";

export const BaseInput = ({
    label,
    value,
    onChange,
    onInput,
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
                    $error={error}
                    $valid={!error && valid}
                    placeholder={placeholder}
                />
                {mode === "login" && error && <StarInside>*</StarInside>}
            </InputContainer>
        </InputWrapper>
    );
};
