import { Main } from "../components/Main/Main";

const MainPage = ({ transactions, isSpendSelected, onclick }) => {

const MainPage = () => {
    return (
        <Main
            transactions={transactions}
            isSpendSelected={isSpendSelected}
            onclick={onclick}
        />
        <Main
        />
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
