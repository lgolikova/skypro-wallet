import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SHeader from "../components/Header/Header";
import SContainer from "../components/Container.styled";
import SGlobalWrapper from "../components/GlobalWrapper.styled";

const MainPage = () => {
    return (
        <>
            <SHeader />
            <SGlobalWrapper>
                <SContainer>Здесь будет код</SContainer>
            </SGlobalWrapper>
            {/* <Outlet /> */}
        </>
    );
};

export default MainPage;
