import Header from "../Header/Header";
import SGlobalWrapper from "../GlobalWrapper.styled";
import SContainer from "../Container.styled";
import { STitle, SContentWrapper } from "./Main.styled";
import { MainTable } from "../MainTable/MainTable";
import { SpendForm } from "../SpendForm/SpendForm";


export const Main = ({transactions, isSpendSelected, onclick}) => {
  return (
    <>
      <Header />
      <SGlobalWrapper>
        <SContainer>
          <STitle>Мои расходы</STitle>
          <SContentWrapper>
            <MainTable transactions={transactions} isSpendSelected={isSpendSelected} onclick={onclick}/>
            <SpendForm />
          </SContentWrapper>
        </SContainer>
      </SGlobalWrapper>
    </>
  )
}