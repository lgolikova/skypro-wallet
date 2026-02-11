import React, { useState, useContext } from "react";
import { BaseInput } from "./ui/Input";
import { BaseButton } from "./ui/Button";
import { signIn, signUp } from "../services/auth";
import { AuthContext } from "../context/AuthContext";
import {
    FormWrapper,
    ErrorMessage,
    SwitchText,
    ButtonWrapper,
} from "./AuthForm.styled";

export const AuthForm = ({ mode = "login", onSwitchMode, onSuccess }) => {
    const { login } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
    });

    const [errorText, setErrorText] = useState("");

    // Валидация
    const validateEmail = (v) => !v.includes("@");
    const validatePassword = (v) => v.length < 6;
    const validateName = (v) => mode === "register" && v.length < 2;

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({ name: true, email: true, password: true });

        if (!isFormValid) return;

        setErrorText("");

        try {
            let user;

            if (mode === "login") {
                user = await signIn({ login: email, password });
            } else {
                user = await signUp({
                    name: name.trim(),
                    login: email,
                    password,
                });
            }

            login(user);
            onSuccess?.();
        } catch (err) {
            setErrorText(err.message);
        }
    };

    return (
        <>
            <FormWrapper onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center", marginBottom: "12px" }}>
                    {mode === "login" ? "Вход" : "Регистрация"}
                </h2>
                {mode === "register" && (
                    <BaseInput
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setTouched((t) => ({ ...t, name: true }));
                        }}
                        error={nameError}
                        valid={!nameError && name !== ""}
                        placeholder="Имя"
                    />
                )}
                <BaseInput
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setTouched((t) => ({ ...t, email: true }));
                    }}
                    error={emailError}
                    valid={!emailError && email !== ""}
                    placeholder="Эл. почта"
                />

                <BaseInput
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

                {errorText && <ErrorMessage>{errorText}</ErrorMessage>}

                <SwitchText>
                    {mode === "login" ? (
                        <>
                            <p>Нужно зарегистрироваться?</p>
                            <a onClick={onSwitchMode}>Регистрируйтесь здесь</a>
                        </>
                    ) : (
                        <>
                            <p>Уже есть аккаунт?</p>
                            <a onClick={onSwitchMode}>Войдите здесь</a>
                        </>
                    )}
                </SwitchText>
            </FormWrapper>
        </>
    );
};
