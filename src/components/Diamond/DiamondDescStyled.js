import styled from "styled-components";

const DiamondDescStyled = styled.div`
  -webkit-text-size-adjust: 100%;
  font-size: 1.4rem;
  color: rgb(0, 0, 0);
  cursor: pointer !important;
  line-height: 1.5;
  margin-top: 7px;
  margin-bottom: 2px;
  text-align: center;
  width: 100%;
  max-width: 410px;

  .desk-screen {
    -webkit-text-size-adjust: 100%;
    font-size: 1.4rem;
    color: rgb(0, 0, 0);
    cursor: pointer !important;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px 4px;
    width: 100%;
  }
  .flex-desc {
    display: none;
    justify-content: space-between;
    .flex-desc-left,
    .flex-desc-right {
      width: 118px;
    }
    .flex-desc-right {
      margin-right: 0;
      text-align: right;
    }
    .flex-infos {
      display: flex;
      column-gap: 3px;
      justify-content: space-between;
      height: 21px;
    }
    .info {
      font-size: 9px;
    }
    .value {
      font-size: 9px;
      font-weight: bold;
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 1000px) {
    margin-left: 10px;
    .desk-screen {
      display: none;
    }
    .flex-desc {
      display: flex;
      gap: 2vw;
    }
  }

  @media screen and (max-width: 400px) {
    .flex-desc-left,
    .flex-desc-right {
      width: unset !important;
    }
  }
`;

export default DiamondDescStyled;
