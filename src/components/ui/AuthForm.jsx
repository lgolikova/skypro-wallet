import React, { useState } from "react";
import styled from "styled-components";
import { BaseInput } from "./Input";
import { BaseButton } from "./Button";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <BaseInput label="Почта" value={email} />
            <BaseInput label="Пароль" type="password" value={password} />
            <BaseButton text="Войти" />
        </>
    );
};
