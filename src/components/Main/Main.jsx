import Header from "../Header/Header";
import SGlobalWrapper from "../GlobalWrapper.styled";
import SContainer from "../Container.styled";
import { STitle, SContentWrapper } from "./Main.styled";
import { MainTable } from "../MainTable/MainTable";
import { NewSpendForm } from "../NewSpendForm/NewSpendForm";


export const Main = () => {
  return (
    <>
      <Header />
      <SGlobalWrapper>
        <SContainer>
          <STitle>Мои расходы</STitle>
          <SContentWrapper>
            <MainTable />
            <NewSpendForm />
          </SContentWrapper>
        </SContainer>
      </SGlobalWrapper>
    </>
  )
}