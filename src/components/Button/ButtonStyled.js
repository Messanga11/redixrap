import styled from "styled-components";

const ButtonStyled = styled.button`
  margin: 0;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: none;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease-in-out 0s;
  padding: 10px;
  cursor: pointer;
  height: 42px;
  position: relative;
  border-radius: 3px;
  font-size: 1.4rem;
  text-align: center;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  margin-right: 9px;
  background-color: rgb(231, 231, 231) !important;
  border-color: rgb(219, 219, 219) !important;
  color: rgb(27, 34, 46) !important;
  transition: filter 0.2s;
  svg {
    font-size: 2.5rem;
  }
  ${({ altern, colored }) =>
    altern &&
    `
width: fit-content;
display: flex;
align-items: center;
  ${
    colored &&
    `
    background-color: rgb(160, 146, 2)!important;
    border-color: rgb(160, 146, 2)!important;
    color: rgb(255, 255, 255)!important;
    border-width: 1px;
    border-style: solid;
    transition: all 0.3s ease-in-out 0s;
    cursor: pointer;
    height: 42px;
    position: relative;
    border-radius: 3px;
    text-align: center;
    line-height: 1.5rem;
    z-index: 2000000;
    `
  }`}
  &:hover {
    filter: brightness(80%);
  }
`;

export default ButtonStyled;
