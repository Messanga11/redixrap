import styled from "styled-components";

const MiniButton = styled.div`
  -webkit-text-size-adjust: 100%;
  margin: 0;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: none;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  position: relative;
  border-radius: 3px;
  text-align: center;
  line-height: 1.5rem;
  display: inline-block;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-right: 5px;
  padding: 0px;
  background-color: rgb(239, 239, 239);
  border-color: rgb(227, 227, 227);
  color: rgb(27, 34, 46);
  font-size: 10px;
  position: relative;
  padding: 15px 3px;
  &:before {
    ${({ content }) => content && 'content: "' + content + '";'}
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%) scale(0.2);
    border-radius: 2px;
    font-size: 10px;
    font-weight: bold;
    background-color: rgb(231, 231, 231);
    border-color: rgb(219, 219, 219);
    padding: 2px 5px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: all 0.2s;
  }
  &:hover:before {
    opacity: 1;
    visibility: visible;
    top: -30px;
    transform: translateX(-50%) scale(1);
  }
  &:hover {
    box-shadow: inset 0 0 5px rgb(209, 209, 209);
    background-color: rgb(231, 231, 231);
  }
  span {
    -webkit-text-size-adjust: 100%;
    cursor: pointer;
    text-align: center;
    color: rgb(27, 34, 46);
    font-style: normal;
    font-weight: bold;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    svg {
      height: 30px !important;
      width: 30px !important;
      padding: 3px;
      transition: unset;
    }
  }
`;

export default MiniButton;
