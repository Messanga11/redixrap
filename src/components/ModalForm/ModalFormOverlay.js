import styled from "styled-components";

const ModalFormOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #0007;
  z-index: 44001 !important;
  display: grid;
  place-items: center;
  animation: fade-in 0.5s ease;
`;

export default ModalFormOverlay;
