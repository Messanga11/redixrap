import styled from "styled-components";

const DiamondStyled = styled.div`
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  width: fit-content;
  height: 285px;
  border-bottom: 1px solid rgb(242, 242, 242);
  font-family: inherit;
  font-size: 1.4rem;
  color: rgb(0, 0, 0);
  margin: auto;
  display: flex;
  flex-direction: column;
  transition: all 0.15s ease-in 0s;
  cursor: pointer !important;
  transition: transform 0.2s;
  @media screen and (min-width: 1000px) {
    max-width: 200px !important;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.29) 0px 3px 6px;
    transform: scale(1.03);
  }

  img {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    font-size: 1.4rem;
    cursor: pointer !important;
    color: transparent;
    border-style: none;
    object-fit: cover;
    width: 200px;
    height: 200px;
    opacity: 1;
    transition: opacity 0.3s;
    animation: blurLoading 1s ease;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: row;
    align-items: center;
    height: fit-content;
    width: 95%;
    padding-bottom: 10px;
    &:hover {
      box-shadow: unset;
      transform: unset;
    }
    img {
      width: 94px;
      height: 94px;
    }
  }
`;

export default DiamondStyled;
