import styled from "styled-components";

const SortDropdownStyled = styled.div`
  line-height: 1.15;
  font-size: 10px;
  color: rgb(27, 34, 46);
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border-radius: 2px;
  animation: fade-in 0.5s ease;
  box-shadow: rgb(0 0 0 / 29%) 0px 5px 6px;
  .sort-box {
    color: rgb(27, 34, 46);
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    padding: 20px;
    -webkit-box-align: start;
    align-items: start;
    width: max-content;
    & > .active {
      color: rgb(160, 146, 2);
      & > .sort-item-sub {
        display: flex !important;
      }
    }
  }
  .sort-item {
    font-size: 10px;
    color: rgb(27, 34, 46);
    display: flex;
    flex-direction: column;
    -webkit-box-align: start;
    align-items: start;
    width: 100%;
    margin-bottom: 10px;
    button {
      margin: auto;
      overflow: visible;
      text-transform: none;
      -webkit-appearance: button;
      transition: all 0.3s ease-in-out 0s;
      position: relative;
      border-radius: 3px;
      text-align: center;
      line-height: 1.5rem;
      display: inline-block;
      background: rgb(255, 255, 255);
      border: none;
      padding: 1px;
      height: auto;
      cursor: pointer;
      font-size: 1.6rem;
      color: inherit;
    }
    .sort-item-sub {
      display: none;
      line-height: 1.15;
      font-size: 10px;
      color: rgb(27, 34, 46);
      -webkit-box-align: center;
      align-items: center;
      margin: auto;
      margin-top: 8px;
      .btn-left {
        overflow: visible;
        text-transform: none;
        -webkit-appearance: button;
        transition: all 0.3s ease-in-out 0s;
        position: relative;
        border-radius: 3px;
        text-align: center;
        line-height: 1.5rem;
        display: inline-block;
        background: rgb(255, 255, 255);
        border: none;
        padding: 1px;
        height: auto;
        cursor: pointer;
        font-size: 1.4rem;
        margin: 0px 5px;
        margin-left: 0px;
        color: inherit;
      }
      .btn-right {
        overflow: visible;
        text-transform: none;
        -webkit-appearance: button;
        transition: all 0.3s ease-in-out 0s;
        position: relative;
        border-radius: 3px;
        text-align: center;
        line-height: 1.5rem;
        display: inline-block;
        background: rgb(255, 255, 255);
        color: rgb(27, 34, 46);
        border: none;
        padding: 1px;
        height: auto;
        cursor: pointer;
        font-size: 1.4rem;
        margin: 0px 5px;
      }
      & > .active {
        color: rgb(160, 146, 2);
      }
    }
  }
`;
export default SortDropdownStyled;
