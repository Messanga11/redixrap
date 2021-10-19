import styled from "styled-components";

const TableDiamonds = styled.div`
  animation: fade-in 0.5s ease;
  .table-header {
    line-height: 1.15;
    font-size: 10px;
    color: rgb(27, 34, 46);
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 42px;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px 12px;
  }
  .table-col {
    line-height: 1.15;
    color: rgb(27, 34, 46);
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    -webkit-box-align: center;
    align-items: center;
    flex: 1 1 0px;
    padding: 0px 3px;
    text-align: center;
    overflow: hidden;
    cursor: pointer;
  }
  .table-col-active > * {
    color: rgb(160, 146, 2) !important;
  }
  .table-col-header {
    display: flex;
    align-items: center;
    color: rgb(27, 34, 46);
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rotate .MuiSvgIcon-root {
    transform: rotate(180deg);
    transition: transform 0.2s;
  }
  .table-col-sub {
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    color: rgb(112, 112, 112);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 3px;
    width: 101px;
  }
  .table-row {
    font-size: 10px;
    color: rgb(27, 34, 46);
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0px 12px;
    height: 42px;
    transition: all 0.3s ease-in-out 0.1s;
    cursor: pointer;
    border-top: 1px solid rgb(242, 242, 242);
  }
  .table-row:hover {
    background: rgb(244, 244, 244);
  }
  .table-col-row {
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    color: rgb(0, 0, 0);
    -webkit-box-pack: center;
    justify-content: center;
    flex: 1 1 0px;
    padding: 0px 3px;
    text-align: center;
    cursor: pointer;
    white-space: nowrap !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default TableDiamonds;
