import styled from "styled-components";


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

export const SFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SSortWrapper = styled.div`
  display: flex;
  flex-direction: row;
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