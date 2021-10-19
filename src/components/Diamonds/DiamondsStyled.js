import styled from "styled-components";

const DiamondsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 15px;
  row-gap: 20px;
  padding: 0 3%;
  width: 90%;
  margin: auto;
  animation: fade-in 0.5s ease;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    row-gap: 10px !important;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
`;
export default DiamondsStyled;
