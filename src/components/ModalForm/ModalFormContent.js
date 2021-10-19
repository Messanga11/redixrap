import styled from "styled-components";

const ModalFormContent = styled.div`
  transform: scale(0.85);
  line-height: 1.15;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.87);
  position: relative;
  min-width: 284px;
  width: 100%;
  height: fit-content;
  padding: 30px;
  margin: 0px !important;
  max-height: 100% !important;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  max-height: 90vh;
  text-align: left;
  .close-btn {
    font-size: 26px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    color: rgb(0, 0, 0);
    top: 13px;
    position: absolute;
    right: 14px;
    padding: 4px;
    z-index: 2;
    cursor: pointer;
  }
  .title {
    font-size: 1.8rem;
    line-height: 3rem;
    color: rgb(27, 34, 46);
    text-align: center;
    margin-bottom: 27px;
    font-weight: 400;
  }
  label {
    display: block;
    padding: 0;
    margin: 0;
    margin-top: 5px;
  }
  label span {
    color: rgb(135, 123, 2);
  }
  h3 {
    color: rgb(135, 123, 2);
    margin-bottom: 20px;
    text-align: center;
  }
  small {
    font-size: 1.2rem;
    padding-top: 5px;
  }
  button {
    margin: 0;
    overflow: visible;
    text-transform: none;
    border-width: 1px;
    border-style: solid;
    transition: all 0.3s ease-in-out 0s;
    padding: 13px 10px;
    cursor: pointer;
    position: relative;
    border-radius: 3px;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.5rem;
    display: block;
    background-color: rgb(135, 123, 2) !important;
    border-color: rgb(110, 100, 1) !important;
    color: rgb(255, 255, 255) !important;
    width: fit-content;
    margin: auto;
    margin-top: 20px;
    -webkit-appearance: none;
    &:hover {
      opacity: 0.9;
    }
  }
  .modal-form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    gap: 10px;
    font-size: 1.5rem;
    margin-top: 30px;
    button {
      background-color: rgb(244, 244, 244) !important;
      border: 1px solid rgb(231, 231, 231) !important;
      color: #000 !important;
      -webkit-appearance: none;
      &:hover {
        background-color: #000 !important;
        color: rgb(244, 244, 244) !important;
      }
    }
  }
  @media screen and (max-width: 800px) {
    padding: 30px;
    width: 68%;
  }
  @media screen and (max-width: 500px) {
    padding: 20px;
    width: 90%;
  }
`;

export default ModalFormContent;
