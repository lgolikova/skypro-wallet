import styled from 'styled-components';


export const SDropdownListWrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  background-color: #FFFFFF;
  border: 0.5px solid #999999;
  border-radius: 6px;
  position: absolute;
  z-index: 2;
  top: 24px;
  right: 0;
`;

export const SContent = styled.div`
  height: 31px;
  max-width: min-content;
  padding: 8px 20px;
  background-color: #F4F5F6;
  border-radius: 30px;
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
