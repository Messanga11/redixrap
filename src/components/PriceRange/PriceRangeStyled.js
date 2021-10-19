import styled from "styled-components";

const PriceRangeStyled = styled.div`
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 10px;
  position: relative;
  margin: 0;
  margin-bottom: 7px;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  @media screen and (max-width: 507px) {
    span {
      font-size: 0.75em !important;
    }
  }
  .slider {
    position: relative;
    z-index: 1;
    height: 5px;
    width: calc(100% - 50px);
    margin-left: 25px;
    margin-top: 7px;
  }
  .rail {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    border-radius: 1px;
    background-color: rgb(244, 244, 244);
    height: 6px;
    opacity: 1;
  }
  .track {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 1px;
    background-color: rgb(160, 146, 2);
    height: 6px;
    left: 0;
  }
  .thumb {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    outline: 0;
    position: absolute;
    z-index: 4;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-top: -7px;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(27, 34, 46);
    background-color: rgb(27, 34, 46);
    opacity: 0;
  }
  .left {
    left: 0%;
    margin-left: -15px;
  }
  .right {
    right: 0%;
    margin-right: -15px;
  }
  .mark {
    position: absolute;
    width: 3px;
    height: 120%;
    background-color: #fff;
    z-index: 3;
  }
  input[type="range"] {
    position: absolute;
    pointer-events: none;
    -webkit-appearance: none;
    z-index: 2;
    height: 10px;
    width: 100%;
    margin: 0;
    top: 0;
    background-color: transparent;
    opacity: ${({ withoutThumbs }) => (withoutThumbs ? 0 : 1)};
    border: 0 none;
    border-color: transparent !important;
  }
  input[type="range"]::-moz-range-thumb {
    display: block;
    pointer-events: ${({ withoutThumbs }) => (withoutThumbs ? "none" : "auto")};
    width: 18px;
    height: 18px;
    border: 0 none;
    -webkit-appearance: none;
    cursor: pointer;
    box-shadow: 0px 0px 0px 3px rgba(63, 81, 181, 0.16);
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(27, 34, 46);
    background-color: rgb(27, 34, 46);
    opacity: 1;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  input[type="range"]::-ms-thumb {
    display: block;
    pointer-events: ${({ withoutThumbs }) => (withoutThumbs ? "none" : "auto")};
    width: 18px;
    height: 18px;
    border: 0 none;
    -webkit-appearance: none;
    cursor: pointer;
    box-shadow: 0px 0px 0px 3px rgba(63, 81, 181, 0.16);
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(27, 34, 46);
    background-color: rgb(27, 34, 46);
    opacity: 1;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  input[type="range"]::-webkit-slider-thumb {
    display: block;
    pointer-events: ${({ withoutThumbs }) => (withoutThumbs ? "none" : "auto")};
    width: 18px;
    height: 18px;
    border: 0 none;
    -webkit-appearance: none;
    cursor: pointer;
    box-shadow: 0px 0px 0px 3px rgba(63, 81, 181, 0.16);
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(27, 34, 46);
    background-color: rgb(27, 34, 46);
    opacity: 1;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  input[type="range"]::-moz-range-thumb:hover {
    box-shadow: 0px 0px 0px 0 rgba(63, 81, 181, 0.16);
    background-color: rgb(47, 54, 66);
  }

  input[type="range"]::-ms-thumb:hover {
    box-shadow: 0px 0px 0px 0 rgba(63, 81, 181, 0.16);
    background-color: rgb(47, 54, 66);
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 0px 0 rgba(63, 81, 181, 0.16);
    background-color: rgb(47, 54, 66);
  }
  @media screen and (max-width: 1000px) {
    input[type="range"] {
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
export default PriceRangeStyled;
