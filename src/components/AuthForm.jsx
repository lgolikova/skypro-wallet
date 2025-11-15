import React, { useState } from "react";
import styled from "styled-components";
import { BaseInput } from "./ui/Input";
import { BaseButton } from "./ui/Button";
import SContainer from "./Container.styled";
import SGlobalWrapper from "./GlobalWrapper.styled";
import Header from "./Header/Header";

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 379px;
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 32px;
    border-radius: 16px;
`;

const ErrorMessage = styled.div`
    color: #f84d4d;
    font-size: 12px;
    line-height: 150%;
    margin-top: 12px;
    letter-spacing: -1%;
`;

const SwitchText = styled.div`
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

const ButtonWrapper = styled.div`
    margin-top: 12px;
`;

export const AuthForm = ({ mode = "login", onSwitchMode }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
    });
    const [hasError, setHasError] = useState(false);

    // Валидация
    const validateEmail = (value) => !value.includes("@");
    const validatePassword = (value) => value.length < 6;
    const validateName = (value) => mode === "register" && value.length < 2;
    const nameError = touched.name && validateName(name);
    const emailError = touched.email && validateEmail(email);
    const passwordError = touched.password && validatePassword(password);

    const isFormValid =
        (mode === "login" &&
            !validateEmail(email) &&
            !validatePassword(password)) ||
        (mode === "register" &&
            !validateName(name) &&
            !validateEmail(email) &&
            !validatePassword(password));

    const handleSubmit = (e) => {
        e.preventDefault();

        setTouched({ email: true, password: true, name: true });

        if (!isFormValid) {
            setHasError(true);
            return;
        }

        setHasError(false);

        const formData =
            mode === "register"
                ? { name: name.trim(), email, password }
                : { email, password };

        setName("");
        setEmail("");
        setPassword("");
        setTouched({ name: false, email: false, password: false });
    };

    return (
        <>
            <FormWrapper onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center", marginBottom: "12px" }}>
                    {mode === "login" ? "Вход" : "Регистрация"}
                </h2>
                {mode === "register" && (
                    <BaseInput
                        label="Имя"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setTouched((prev) => ({ ...prev, name: true }));
                        }}
                        error={nameError}
                        valid={!nameError && name !== ""}
                        mode="login"
                        placeholder="Имя"
                    />
                )}
                <BaseInput
                    label="Почта"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setTouched((prev) => ({ ...prev, email: true }));
                    }}
                    error={emailError}
                    valid={!emailError && email !== ""}
                    mode="login"
                    placeholder="Эл. почта"
                />

                <BaseInput
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setTouched((prev) => ({ ...prev, password: true }));
                    }}
                    error={passwordError}
                    valid={!passwordError && password !== ""}
                    mode="login"
                    placeholder="Пароль"
                />

                <ButtonWrapper>
                    <BaseButton
                        text={mode === "login" ? "Войти" : "Зарегистрироваться"}
                        active={isFormValid}
                    />
                </ButtonWrapper>

                {hasError && (
                    <ErrorMessage>
                        Упс! Введенные вами данные некорректны. <br />
                        Введите данные корректно и повторите попытку.
                    </ErrorMessage>
                )}
                <SwitchText>
                    {mode === "login" ? (
                        <>
                            <p>Нужно зарегистрироваться? </p>
                            <a onClick={onSwitchMode}>Регистрируйтесь здесь</a>
                        </>
                    ) : (
                        <>
                            <p>Уже есть аккаунт? </p>
                            <a onClick={onSwitchMode}>Войдите здесь</a>
                        </>
                    )}
                </SwitchText>
            </FormWrapper>
        </>
    );
};
