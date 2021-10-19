import styled from "styled-components";

const ModalFormInput = styled.div`
  position: relative;
  label {
    font-size: 1.3rem;
    line-height: 2rem;
    color: rgb(27, 34, 46);
    margin-bottom: 10px;
  }
  input {
    font-family: inherit;
    line-height: 1.15;
    margin: 0;
    overflow: visible;
    width: 100%;
    height: 30px;
    border: 1px solid rgb(239, 239, 239);
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.3rem;
    border-radius: 3px;
  }
  textarea {
    font-family: inherit;
    line-height: 1.15;
    margin: 0;
    overflow: auto;
    width: 100%;
    border: 1px solid rgb(239, 239, 239);
    margin-bottom: 10px;
    padding: 10px;
    font-size: 1.3rem;
    border-radius: 3px;
    height: 75px;
    resize: none;
  }
  small {
    position: absolute;
    bottom: -3px;
    left: 0px;
    color: rgb(160, 146, 2);
  }
`;
export default ModalFormInput;
