import styled from "styled-components";

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  & > * {
    width: auto;
  }
  @media screen and (max-width: 1000px) {
    display: flex;
    width: fit-content;
    grid-template-columns: unset;
    margin-left: ${({ sliderIndex }) =>
      "calc(-" + sliderIndex * 80 + "vw - " + sliderIndex * 10 + "px)"};
    & > * {
      width: 80vw !important;
      display: block;
    }
  }
`;

export default FilterGrid;
