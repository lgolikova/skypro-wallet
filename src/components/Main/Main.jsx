import Header from "../Header/Header";
import SGlobalWrapper from "../GlobalWrapper.styled";
import SContainer from "../Container.styled";
import { STitle, SContentWrapper } from "./Main.styled";
import { MainTable } from "../MainTable/MainTable";
import { SpendForm } from "../SpendForm/SpendForm";


export const Main = () => {
  return (
    <>
      <Header />
      <SGlobalWrapper>
        <SContainer>
          <STitle>Мои расходы</STitle>
          <SContentWrapper>
            <MainTable />
            <SpendForm />
          </SContentWrapper>
        </SContainer>
      </SGlobalWrapper>
    </>
  )
}