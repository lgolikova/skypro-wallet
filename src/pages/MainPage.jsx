// import React, { useState, useEffect, useContext } from "react";
// import { Outlet } from "react-router-dom";
// import styled from "styled-components";
// import SHeader from "../components/Header/Header";
// import SContainer from "../components/Container.styled";
// import SGlobalWrapper from "../components/GlobalWrapper.styled";
import { Main } from "../components/Main/Main";


const MainPage = ({ spends, isSpendSelected, onclick, addSpend, newSpendDescription, setNewSpendDescription, newSpendCategory, setNewSpendCategory, newSpendDate, setNewSpendDate, newSpendSum, setNewSpendSum }) => {
    return (
        <Main spends={spends} isSpendSelected={isSpendSelected} onclick={onclick} addSpend={addSpend} newSpendDescription={newSpendDescription} setNewSpendDescription={setNewSpendDescription} newSpendCategory={newSpendCategory} setNewSpendCategory={setNewSpendCategory} newSpendDate={newSpendDate} setNewSpendDate={setNewSpendDate} newSpendSum={newSpendSum} setNewSpendSum={setNewSpendSum} />
        // <>
        //     <SHeader />
        //     <SGlobalWrapper>
        //         <SContainer>Здесь будет код</SContainer>
        //     </SGlobalWrapper>
        //     {/* <Outlet /> */}
        // </>
    );
};

export default MainPage;
