import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SHeader from "../components/Header/Header";
import SContainer from "../components/Container.styled";

const MainPage = () => {
    return (
        <>
            <SContainer>
                <SHeader />
            </SContainer>
            {/* <Outlet /> */}
        </>
    );
};

export default MainPage;
