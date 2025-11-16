import styled from "styled-components";


export const SWrapper = styled.div`
  height: 31px;
  max-width: min-content;
  padding: 8px 20px;
  background-color: #F4F5F6;
  border-radius: 30px;
`;

export const SContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const SIcon = styled.img`
  height: 14px;
  width: 14px;
`;

export const STitle = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
`;
