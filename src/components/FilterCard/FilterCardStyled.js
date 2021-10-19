import styled from "styled-components";

const FilterCardStyled = styled.div`
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 10px;
  color: rgb(27, 34, 46);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.29) 0px 0px 3px;
  height: 100px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 1000px) {
    position: relative;
    top: 50%;
    box-shadow: unset;
    min-height: 152px;
    .mobile-color-handler,
    .mobile-color-header {
      position: absolute;
      top: 35px;
      left: 50%;
      transform: translateX(-50%);
    }
    .mobile-color-header {
      top: 0%;
    }
    .mobile-gap {
      height: 30px;
    }
  }
  .title {
    display: flex;
    gap: 30px;
    align-items: center;
    margin-bottom: 14px;
    h6 {
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
      color: rgb(27, 34, 46);
      font-weight: bold;
      font-size: 1.3rem;
      margin: 0;
    }
    span {
      color: rgb(224, 224, 224);
    }
    .active {
      color: inherit;
    }
  }
  .icons-list {
    display: flex;
    width: 100%;
  }
  .switch {
    display: inline-block;
    width: 30px;
    height: 13px;
    position: relative;
  }

  .toggle-thumb {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(244, 244, 244);
    border-radius: 2px;
    cursor: pointer;
  }
  .toggle-thumb:before {
    content: "";
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    outline: 0;
    position: absolute;
    z-index: 3;
    box-sizing: border-box;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 0.2s;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(27, 34, 46);
    background-color: rgb(27, 34, 46);
    box-shadow: 0px 0px 0px 3px rgba(63, 81, 181, 0.16);
  }
  .toggle-thumb:hover:before {
    box-shadow: 0px 0px 0px 0 rgba(63, 81, 181, 0.16);
  }
  .checkbox {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .activeSwitch .toggle-thumb:before {
    transform: translateX(15px);
  }
  .mini-space {
    gap: 10px;
  }
  .mini-btn-active {
    overflow: visible;
    background-color: rgb(160, 146, 2) !important;
    border-color: rgb(160, 146, 2);
    color: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    transition: all 0.3s ease-in-out 0s;
    path:nth-child(1) {
      fill: white;
    }
  }
  @media screen and (max-width: 400px) {
    span {
      font-size: 0.68em !important;
    }
  }
`;

export default FilterCardStyled;
