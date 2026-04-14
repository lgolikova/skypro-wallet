import { Link } from "react-router-dom";
import styled from "styled-components";


export const SFormWrapper = styled.div`
  width: 379px;
  height: 618px;
  background-color: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 33px;

  @media screen and (max-width: 375px) {
    width: auto;
    height: auto;
  }
`;

export const SFormTitle = styled.div`
  font-weight: 700;
  font-style: Bold;
  font-size: 24px;
  line-height: 100%;
  vertical-align: middle;

  @media screen and (max-width: 375px) {

  }
`;

export const SBlockWrapper = styled.div`
  width: 100%;
  height: 75px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SBlockTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
`;

export const SCategoriesWrapper = styled.div`
  width: 100%;
  height: 105px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
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
  flex-direction: column;
  gap: 12px;
  justify-content: start;
  /* align-items: start; */
  width: 100%;
  /* padding: 0 16px; */
`

export const SDeleteLink = styled(Link)`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle;
  color: #999999;
  text-decoration: underline;
`