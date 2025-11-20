import styled, { keyframes } from "styled-components";


export const STableWrapper = styled.div`
  width: 789px;
  height: 618px;
  background-color: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  gap: 32px;
`;

export const STableHeaderWrapper = styled.div`
  width: 100%;
  padding: 32px 34px 6px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid #999999;
  height: 114px;
  gap: 32px;
`;

export const STableTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const STableTitle = styled.div`
  font-weight: 700;
  font-style: Bold;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
`;

export const SActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const SActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
`;

export const SFilterTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  vertical-align: middle;
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
`;

export const STableContent = styled.div`
  width: 100%;
  /* padding: 18px 34px 7px 32px; */
  padding-top: 18px;
  /* padding-left: 32px; */
  display: flex;
  flex-direction: column;
  /* gap: 14px; */
  `;

// const rotate = keyframes`
// 0% {
//   transform: rotateZ(0deg);
// }
// 100% {
//   transform: rotateZ(180deg);
// }
// `;

// const rotateBack = keyframes`
// 0% {
//   transform: rotateZ(180deg);
// }
// 100% {
//   transform: rotateZ(0deg);
// }
// `;