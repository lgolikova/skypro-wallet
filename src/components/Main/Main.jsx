import Header from "../Header/Header";
import SGlobalWrapper from "../GlobalWrapper.styled";
import SContainer from "../Container.styled";
import { STitle, SContentWrapper, SLinkTo, SWrapper } from "./Main.styled";
import { MainTable } from "../MainTable/MainTable";
import { SpendForm } from "../SpendForm/SpendForm";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/icons/add.svg";

export const Main = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 375px)" });

  const location = useLocation();
  const isMainPage = location.pathname === "/";


  return (
    <>
      <Header />
      <SGlobalWrapper>
        <SContainer>

          {(!isMobile || isMainPage) && (
            <SWrapper>
              <STitle>Мои расходы</STitle>
              {isMobile && (
                <SLinkTo onClick={() => navigate("/spend/new")}>
                  <img src={addIcon} alt="добавить" />
                  <span>Новый расход</span>
                </SLinkTo>
              )}
            </SWrapper>
          )}

          <SContentWrapper>
            {isMobile ? (
              <Outlet />
            ) : (
              <>
                <MainTable />
                <SpendForm />
              </>
            )}
          </SContentWrapper>
        </SContainer>
      </SGlobalWrapper>
    </>
  )
}