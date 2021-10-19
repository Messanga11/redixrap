import styled from "styled-components";

const SinglePageStyled = styled.div`
  display: grid;
  max-width: 900px;
  margin: auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "back back"
    "img desc"
    "details details"
    "color color"
    "clarity clarity"
    "cut cut";
  padding-top: 30px;
  padding-bottom: 60px;
  animation: fade-in 0.5s ease;
  .back {
    grid-area: back;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    transition: all 0.3s ease-in-out 0s;
    position: relative;
    border-radius: 3px;
    text-align: left;
    line-height: 1.5rem;
    border: none;
    width: fit-content;
    height: auto;
    cursor: pointer;
    margin: 15px 0 25px 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    color: #000;
    align-self: flex-start;
  }
  .img-container {
    grid-area: img;
    line-height: 1.15;
    font-size: 10px;
    -webkit-box-flex: initial;
    flex-grow: initial;
    max-width: 100%;
    width: 300px;
    margin: 0px 110px 10px 0px;
    img {
      line-height: 1.15;
      border-style: none;
      width: 300px;
      height: unset;
    }
  }
  h6 {
    font-size: 1.3rem;
    color: rgb(27, 34, 46);
    margin: 0;
    padding: 0;
    transition: all 0.2s;
    box-sizing: border-box;
    display: flex;
    gap: 30px;
    align-items: center;
    margin-left: 15px;
    margin-top: 60px;
    text-align: left;
  }
  .desc {
    grid-area: desc;
    .title {
      -webkit-box-flex: initial;
      flex-grow: initial;
      max-width: 100%;
      width: 100%;
      margin: 0px 0px 15px;
      font-size: 2.6rem;
      line-height: 3rem;
      font-weight: 400;
      color: #000;
      p {
        margin: 0;
      }
    }
    .sub {
      display: flex;
      gap: 20px;
      color: rgb(27, 34, 46);
      -webkit-box-flex: initial;
      flex-grow: initial;
      max-width: 100%;
      line-height: 3rem;
      font-size: 1.6rem;
      .report {
        font-size: 1.2rem;
        line-height: 3rem;
        background: rgb(255, 255, 255);
        color: rgba(160, 146, 2, 0.7);
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        transition: filter 0.1s;
      }
      .report:hover {
        filter: brightness(110%);
      }
    }
    .price {
      max-width: 100%;
      width: 100%;
      margin: 25px 0px 0px;
      font-size: 3rem;
      line-height: 3.8rem;
      color: rgb(160, 146, 2);
    }
    .btns {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    .add-btn {
      display: flex;
      align-items: center;
      margin: 0;
      overflow: visible;
      text-transform: none;
      border-width: 1px;
      border-style: solid;
      transition: all 0.3s ease-in-out 0s;
      padding: 13px 10px;
      cursor: pointer;
      border-radius: 3px;
      font-size: 1.4rem;
      text-align: center;
      line-height: 1.5rem;
      position: relative;
      background-color: rgb(135, 123, 2);
      border-color: rgb(110, 100, 1);
      color: rgb(255, 255, 255);
      font-weight: bold;
    }
    .make-btn {
      margin: 0;
      overflow: visible;
      border-width: 1px;
      border-style: solid;
      transition: all 0.3s ease-in-out 0s;
      padding: 13px 10px;
      cursor: pointer;
      border-radius: 3px;
      font-size: 1.4rem;
      font-weight: bold;
      text-align: center;
      line-height: 1.5rem;
      display: block;
      background-color: rgb(244, 244, 244) !important;
      border-color: rgb(244, 244, 244) !important;
      color: rgb(27, 34, 46) !important;
      position: relative;
    }
    .make-btn:hover {
      color: rgb(27, 34, 46) !important;
    }
  }
  .fancy * {
    cursor: default !important;
  }
  .fancy > * {
    background: transparent !important;
    border: none;
    box-shadow: unset;
    z-index: 20000;
    width: 30px;
    padding: 0;
    span {
      border: 2px solid rgb(231, 231, 231);
      border-radius: 999px;
      margin: 0 3px;
      height: 28px !important;
      display: grid;
      place-items: center;
      box-shadow: unset;
      width: 30px;
      svg {
        display: block;
        margin: 0;
        padding: 0;
        width: 18px !important;
        height: 18px !important;
      }
    }
  }
  .icon-list {
    font-size: 10px;
    color: rgb(27, 34, 46);
    margin: 0;
    padding: 0;
    transition: all 0.2s;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .fancy > *:hover {
    box-shadow: unset;
  }
  .fancy > *:before {
    content: "" !important;
    background: none;
    border: none;
  }
  .active-fancy span {
    border-color: rgb(135, 123, 2) !important;
    position: relative;
  }
  .active-fancy span:after {
    content: url("data:image/svg+xml;base64,PHN2ZwogICAgICAgICAgICAgIHdpZHRoPSIxOCIKICAgICAgICAgICAgICBoZWlnaHQ9IjE3IgogICAgICAgICAgICAgIHZpZXdCb3g9IjAgMCAxOCAxNyIKICAgICAgICAgICAgICBmaWxsPSJub25lIgogICAgICAgICAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgICAgICAgICAgPgogICAgICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICAgICBkPSJNMTAuNzk3OSAxNS43NTYzQzEwLjAxNTIgMTcuMTY4NCA3Ljk4NDggMTcuMTY4MyA3LjIwMjEzIDE1Ljc1NjJMMC4yOTkzMDkgMy4zMDIwNEMtMC40NjAwNTQgMS45MzE5OCAwLjUzMDc1IDAuMjUgMi4wOTcxOCAwLjI1SDE1LjkwMjhDMTcuNDY5MyAwLjI1IDE4LjQ2MDEgMS45MzE5OCAxNy43MDA3IDMuMzAyMDRMMTAuNzk3OSAxNS43NTYzWiIKICAgICAgICAgICAgICAgIGZpbGw9ImJsYWNrIgogICAgICAgICAgICAgIC8+CiAgICAgICAgICAgIDwvc3ZnPg==");
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    fill: black;
    width: 18px;
    height: 18px;
    position: absolute;
  }
  .details {
    grid-area: details;
    margin-top: 0;
    width: 80%;
    table {
      margin-left: 15px;
      flex: 1 !important;
      width: 50%;
      max-width: 300px;
      td {
        padding-bottom: 3px !important;
        border-color: transparent;
      }
    }
    table:nth-child(2) {
      margin-left: 60px;
    }
    .info {
      margin: 0px;
      font-size: 1.5rem;
      line-height: 1.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgb(112, 112, 112);
      text-align: left;
    }
    .value {
      margin: 0px;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.9rem;
      color: rgb(0, 0, 0);
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .color {
    grid-area: color;
    width: 100%;
  }
  .clarity {
    grid-area: clarity;
    width: 100%;
  }
  .cut {
    grid-area: cut;
    width: 100%;
  }
  .flex-infos {
    display: flex;
    gap: 20px;
    font-size: 1.5rem;
    line-height: 2rem;
    color: rgb(0, 0, 0);
    padding: 20px 0px;
    align-items: center;
  }
  .flex-infos > *:nth-child(1) {
    flex: 0.6;
  }
  .flex-infos > *:nth-child(2) {
    flex: 0.4;
  }
  .explication {
    font-size: 1.5rem;
    line-height: 2rem;
    color: rgb(0, 0, 0);
  }
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90vw;
    text-align: center;
    .small-indicators {
      display: flex;
      justify-content: center;
      gap: 15px;
      padding: 20px 0;
      img {
        display: none;
      }
    }
    .small-indicator {
      font-size: 100%;
      line-height: 1.15;
      overflow: visible;
      text-transform: none;
      border-radius: 50%;
      height: 10px;
      outline: none;
      width: 10px;
      background: rgb(59, 59, 59);
      border: none;
      cursor: pointer;
    }
    .icon-list {
      display: grid;
      grid-template-columns: repeat(7, minmax(35px, 1fr));
      column-gap: 0vw;
      row-gap: 60px;
    }
    .small-indicator-active {
      background: rgb(160, 146, 2);
    }
    h6 {
      justify-content: center;
    }
    .img-container {
      width: 40vw !important;
      min-width: 280px;
      height: unset;
      margin: auto;
      margin-bottom: 20px;
      img {
        display: block;
        margin: auto;
        border-style: none;
        width: 100%;
        height: unset;
      }
    }
    .img-indicators {
      display: flex;
      gap: 10px;
      width: 40vw !important;
      min-width: 280px;
      height: unset;
      margin: auto;
      overflow-x: auto;
    }
    .sub {
      justify-content: center;
    }
    .btns {
      margin: auto;
      width: fit-content;
    }
    .details {
      width: 100%;
      padding-left: 10vw;
      padding-right: 10vw;
      table {
        margin-left: 15px;
        flex: 1 !important;
        width: 100%;
      }
      table:nth-child(2) {
        margin-left: 0;
      }
    }
    .flex-infos {
      flex-direction: column !important;
      text-align: center;
      justify-content: center;
    }
    .flex-infos > * {
      margin-left: 0 !important;
      margin-top: 20px;
    }
    .flex-infos > div:nth-child(1) {
      min-width: 300px;
      width: 80%;
    }
    .flex-infos > div:nth-child(2) {
      padding-left: 10vw;
      padding-right: 10vw;
    }
    .explication {
      margin-right: 0 !important;
    }
  }
`;

export default SinglePageStyled;
