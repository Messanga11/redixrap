import styled from "styled-components";

const FilterStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: fit-content;
  background-color: #fff;
  padding: 10px;
  padding-top: 60px;
  line-height: 1.15;
  box-shadow: rgba(0, 0, 0, 0.46) 0px 5px 6px;
  opacity: 0;
  transition: all 0.2s;
  max-width: 100vw;
  pointer-events: none;
  z-index: 100000;
  .hide-filter {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  }
  .show-hidded-filters {
    max-height: 1000px;
    transition: max-height 1s ease-in-out;
  }
  .full-width {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 14px;
    grid-column: 1/3;
  }
  .full-width button {
    margin: 0;
    overflow: visible;
    text-transform: none;
    transition: all 0.3s ease-in-out 0s;
    position: relative;
    border-radius: 3px;
    font-size: 1.4rem;
    text-align: center;
    -webkit-appearance: none;
    line-height: 1.5rem;
    display: flex;
    align-items: center;
    background: rgb(255, 255, 255) !important;
    color: rgb(27, 34, 46) !important;
    border: none;
    padding: 1px;
    height: auto;
    cursor: pointer;
    text-align: center;
  }
  .full-width button:hover {
    color: rgb(27, 34, 46) !important;
  }
  .input-container {
    position: relative;
    font-size: 1.2rem;
    color: rgb(27, 34, 46);
    width: 85px;
    right: 2px;
    left: 2px;
  }
  input {
    -webkit-text-size-adjust: 100%;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    overflow: visible;
    background: rgb(244, 244, 244);
    padding: 9px;
    width: 100%;
    max-width: 100%;
    border-radius: 3px;
    transition: all 0.3s ease-in-out 0s;
    box-sizing: border-box;
    color: rgb(27, 34, 46);
    border: 1px solid rgb(244, 244, 244) !important;
  }
  .unit {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    color: rgb(27, 34, 46);
    position: absolute;
    right: 9px;
    top: 10px;
    font-size: 1.4rem;
    width: fit-content;
  }
  .unit-price {
    left: 9px;
  }
  .unit-price-input {
    padding-left: 18px;
  }
  .flex {
    display: flex;
  }
  .spaced-inputs {
    justify-content: space-between;
  }
  &.show {
    opacity: 1;
    pointer-events: all;
    animation: fade-in 0.5s ease;
  }
  .reset-btn {
    position: absolute;
    top: 25px;
    right: 120px;
    font-size: 1.3rem;
    color: rgba(27, 34, 46, 0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .hide-filters-btn {
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: none;
    border-width: 1px;
    border-style: solid;
    transition: all 0.3s ease-in-out 0s;
    padding: 13px 10px;
    cursor: pointer;
    height: 42px;
    position: relative;
    border-radius: 3px;
    font-size: 1.4rem;
    text-align: center;
    line-height: 1.5rem;
    display: block;
    width: 100%;
    background-color: rgb(135, 123, 2) !important;
    border-color: rgb(110, 100, 1) !important;
    color: rgb(255, 255, 255) !important;
    margin: auto;
  }
  .filter-close-txt-btn-desktop,
  .filter-close-txt-btn {
    position: absolute;
    top: 23px;
    left: 30px;
    font-size: 1.3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 200000;
  }
  .filter-close-txt-btn-desktop {
    top: 3px;
    left: 10px;
    z-index: 200003;
    transform: scale(1.3);
  }
  .times {
    font-size: 15px;
  }
  .fancy > * {
    background: transparent !important;
    border: none;
    box-shadow: unset;
    z-index: 20000;
    span {
      border: 2px solid rgb(231, 231, 231);
      border-radius: 999px;
      margin: 0 3px;
      height: 28px !important;
      display: grid;
      place-items: center;
      box-shadow: unset;
      svg {
        display: block;
        margin: 0;
        padding: 0;
        width: 18px !important;
        height: 18px !important;
      }
    }
  }
  .fancy > *:hover {
    box-shadow: unset;
  }
  .active-fancy {
    span {
      border-color: rgb(135, 123, 2) !important;
    }
  }
  .disabled {
    opacity: 0.5;
    pointer-events: none !important;
  }
  .disabled input {
    pointer-events: none !important;
  }
  @media screen and (max-width: 1000px) {
    .grid-wrapper {
      margin-top: 20px;
      & > div:nth-child(1) {
        & > div {
          height: fit-content;
        }
      }
      & h6 {
        margin: auto !important;
        width: fit-content;
      }
      .grid-7 {
        display: grid;
        row-gap: 10px;
        grid-template-columns: repeat(7, 1fr);
        height: fit-content;
        span {
          width: 35px;
          height: 35px !important;
        }
      }
      .grid-5 {
        display: grid;
        row-gap: 5px;
        grid-template-columns: repeat(5, 1fr);
        height: fit-content;
      }
      .grid-3 {
        display: grid;
        row-gap: 5px;
        grid-template-columns: repeat(3, 1fr);
        height: fit-content;
      }
    }
    .reset-btn {
      right: 30px;
      overflow: hidden;
    }
    & > * {
      max-width: 80vw;
      margin: auto;
      overflow-x: hidden;
    }
    & > .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    & > .back {
      left: 5%;
    }
    & > .next {
      right: 5%;
    }
    .indicators {
      display: flex;
      position: absolute;
      width: fit-content;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      .indicator {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        overflow: visible;
        text-transform: none;
        -webkit-appearance: none;
        border-radius: 50%;
        height: 7px;
        outline: none;
        width: 7px;
        background: rgb(244, 244, 244);
        border: none;
        cursor: pointer;
        padding: 0px;
        margin: 0px 3px;
      }
      .indicator-active {
        background: rgb(160, 146, 2);
      }
    }
  }
`;

export default FilterStyled;
