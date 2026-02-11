import { Main } from "../components/Main/Main";

const MainPage = ({ transactions, isSpendSelected, onclick }) => {
    return (
        <Main
            transactions={transactions}
            isSpendSelected={isSpendSelected}
            onclick={onclick}
        />
    );
};

export default MainPage;
