import styled from "styled-components";


export const SRowWrapper = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  background-color: ${({ $isSpendSelected }) => ($isSpendSelected ? "#DBFFE9" : "#ffffff")};
  cursor: pointer;

  @media (max-width: 375px) {
    max-width: 375px;
    gap: 16px;
  }
`;

export const STableRow = styled.div`
  width: 100%;
  /* padding: 18px 34px 7px 32px; */
  padding-left: 32px;
  height: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  background-color: ${({ $isSpendSelected }) => ($isSpendSelected ? "#DBFFE9" : "#ffffff")};
  cursor: pointer;

  @media (max-width: 375px) {
    padding-left: 16px;
    gap: 10px;
  }
`;

export const SItem = styled.div`
  width: 141px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
  color: ${({ $isSpendSelected }) => ($isSpendSelected ? "#1FA46C" : "#000000")};

  @media (max-width: 375px) {
    width: auto;
    font-size: 10px;
    
    &:nth-child(1) { width: 30%; }
    &:nth-child(2) { width: 25%; }
    &:nth-child(3) { width: 20%; }
    &:nth-child(4) { width: 25%; }
  }
`;

export const SIconsWrapper = styled.div`
  height: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  @media (max-width: 375px) {
    display: none;
  }
`;

export const SIcon = styled.img`
  height: 14px;
  width: 14px;
  cursor: pointer;
`;