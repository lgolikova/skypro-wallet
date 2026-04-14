import styled from "styled-components";


export const STableWrapper = styled.div`
  width: 789px;
  height: 618px;
  background-color: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  gap: 32px;

  @media (max-width: 375px) {
    width: 375px;
    height: auto;
    background-color: #FFFFFF;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const STableHeaderWrapper = styled.div`
  width: 100%;
  padding: 32px 34px 6px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  align-items: stretch;
  border-bottom: 0.5px solid #999999;
  /* height: 114px; */
  gap: 32px;

  @media (max-width: 375px) {
    padding: 16px;
    gap: 24px;
  }
`;

export const STableTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 375px) {
    flex-direction: column;
    gap: 21px;
    /* justify-content: start; */
    align-items: start;
  }
`;

export const STableTitle = styled.div`
  font-weight: 700;
  font-style: Bold;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;

  @media (max-width: 375px) {
    display: none
  }
`;

export const SActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media (max-width: 375px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const SActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;

  @media (max-width: 375px) {
    justify-content: start;
    align-items: center;
    gap: 8px;
  }
`;

export const SFilterTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  vertical-align: middle;
  max-width: 250px;

  @media (max-width: 375px) {
    font-size: 10px;
    max-width: 100%;
  }
`;

export const SFlag = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  vertical-align: middle;
  color: #1FA46C;
  text-decoration: underline solid #1FA46C 1px;
  text-underline-offset: 4px;
`;

export const SActionIcon = styled.img`
  width: 7px;
  height: 7px;
  transform: rotateZ(${({ $isActive }) => ($isActive ? "180deg" : "0deg")});
  transition: transform 0.5s ease-in-out;
`;

export const SSortTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  vertical-align: middle;

  @media (max-width: 375px) {
    font-size: 10px;
    max-width: 100%;
  }
`;

export const SColumnNamesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

export const SColumnName = styled.div`
  width: 141px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #999999;

  @media (max-width: 375px) {
    font-size: 10px;
    width: auto;

    &:nth-child(1) { width: 30%; }
    &:nth-child(2) { width: 25%; }
    &:nth-child(3) { width: 20%; }
    &:nth-child(4) { width: 25%; }
  }
`;

export const STableContent = styled.div`
  width: 100%;
  padding-top: 18px;
  display: flex;
  flex-direction: column;

`;

export const SDropdownListWrapper = styled.div`
`;

export const SLinkTo = styled.div`
  display: none;

  @media (max-width: 375px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    
    span {
      font-size: 14px;
      font-weight: 600;
      color: #1FA46C;
      text-decoration: underline;
    }

    img {
      width: 14px;
      height: 14px;
    }
  }
`;
