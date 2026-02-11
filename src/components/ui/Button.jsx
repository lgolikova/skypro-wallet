import React from "react";
import { SButton } from "./Button.styled";

export const BaseButton = ({ text, active = true, onClick }) => {
    return (
        <SButton
            type="submit"
            $active={active}
            onClick={onClick}
            disabled={!active}
        >
            {text}
        </SButton>
    );
};
