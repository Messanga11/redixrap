import styled from "styled-components";

const PriceStyled = styled.div`
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 1.4rem;
  color: rgb(0, 0, 0);
  cursor: pointer !important;
  font-family: inherit;
  font-weight: bold;
  text-align: center;
  margin: 0;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export default PriceStyled;
