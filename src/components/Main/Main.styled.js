import styled from "styled-components";


export const STitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 150%;
  padding-top: 36px;
  margin-bottom: 32px;

  @media screen and (max-width: 375px) {
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0px;
    vertical-align: middle;
  }
`;

export const SContentWrapper = styled.div`
  max-width: 1200px;
  height: 618px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
    }

    img {
      width: 14px;
      height: 14px;
    }
  }
`;

export const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;;
`