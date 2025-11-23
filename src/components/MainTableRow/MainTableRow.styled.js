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
`;

export const SItem = styled.div`
  width: 141px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
  color: ${({ $isSpendSelected }) => ($isSpendSelected ? "#1FA46C" : "#000000")};
`;

export const SIconsWrapper = styled.div`
  height: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const SIcon = styled.img`
  height: 14px;
  width: 14px;
  cursor: pointer;
`;