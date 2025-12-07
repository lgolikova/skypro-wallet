import Header from "../Header/Header";
import SGlobalWrapper from "../GlobalWrapper.styled";
import SContainer from "../Container.styled";
import { STitle, SContentWrapper } from "./Main.styled";
import { MainTable } from "../MainTable/MainTable";
import { SpendForm } from "../SpendForm/SpendForm";


// export const Main = ({spends, isSpendSelected, onclick, addSpend, newSpendDescription, setNewSpendDescription, newSpendCategory, setNewSpendCategory, newSpendDate, setNewSpendDate, newSpendSum, setNewSpendSum}) => {
export const Main = () => {
  return (
    <>
      <Header />
      <SGlobalWrapper>
        <SContainer>
          <STitle>Мои расходы</STitle>
          <SContentWrapper>
            <MainTable
            // spends={spends} isSpendSelected={isSpendSelected} onclick={onclick}
            />
            <SpendForm
            // addSpend={addSpend} newSpendDescription={newSpendDescription} setNewSpendDescription={setNewSpendDescription} newSpendCategory={newSpendCategory} setNewSpendCategory={setNewSpendCategory} newSpendDate={newSpendDate} setNewSpendDate={setNewSpendDate} newSpendSum={newSpendSum} setNewSpendSum={setNewSpendSum}
            />
          </SContentWrapper>
        </SContainer>
      </SGlobalWrapper>
    </>
  )
}