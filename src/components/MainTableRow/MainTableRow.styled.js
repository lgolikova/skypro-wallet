import styled from "styled-components";


export const SRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 15px;
  gap: 32px;
`;

export const SItem = styled.div`
  width: 141px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
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
`;