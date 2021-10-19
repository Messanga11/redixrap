import styled from "styled-components";

const HeaderStyled = styled.div`
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 10px;
  color: rgb(27, 34, 46);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 13px;
  position: relative;
  z-index: 2000;
  padding: 10px;
  .icon {
    font-size: 24px;
    transition: all 0.2s;
  }
  .sorters {
    position: absolute;
    top: calc(100% + 5px);
    right: 115px;
  }
  .close-sorters {
    display: none;
    cursor: pointer;
  }
  @media screen and (max-width: 1000px) {
    .close-sorters {
      display: block;
      top: 20px;
      right: 35px;
      font-size: 30px;
      position: absolute;
    }
    .sorters {
      position: fixed;
      display: block;
      top: -200%;
      left: 0;
      width: 100vw;
      height: fit-content;
      background-color: #fff;
      box-shadow: 0 7px 5px #0001;
      opacity: 0;
      & > div:nth-child(2) {
        padding-top: 45px;
        margin: auto;
        position: static;
        box-shadow: unset;
        width: fit-content;
        text-align: center;
        .btn {
          display: block;
          margin: auto !important;
        }
      }
    }
    .slide-on-mobile {
      top: 0;
      opacity: 1;
      animation: slide-on-mobile 0.4s ease;
    }
    @keyframes slide-on-mobile {
      0% {
        top: -200%;
      }
      98% {
        top: 0;
      }
    }
    .mobile-filters {
      font-size: 10px;
      color: rgb(27, 34, 46);
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 600px;
      margin: auto;
      .advanced {
        margin: auto;
        margin-top: 15px;
        overflow: visible;
        text-transform: none;
        -webkit-appearance: none;
        transition: all 0.3s ease-in-out 0s;
        position: relative;
        border-radius: 3px;
        text-align: center;
        line-height: 1.5rem;
        display: flex;
        align-items: center;
        border: none;
        padding: 1px;
        height: auto;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.1rem;
        background: rgb(255, 255, 255);
        color: #000;
      }
      .advanced-mobile-filters {
        max-height: 0;
        overflow-y: hidden;
        transition: all 0.5s;
      }
      .show-advanced {
        max-height: 500px;
      }
    }
    .mobile-filters-container {
      font-size: 10px;
      color: rgb(27, 34, 46);
      display: flex;
      flex-direction: column;
    }
    .mobile-filters-row {
      font-size: 10px;
      color: rgb(27, 34, 46);
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
    }
    .mobile-filters-btn {
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
      text-align: center;
      line-height: 1.5rem;
      background-color: rgb(244, 244, 244) !important;
      border-color: rgb(244, 244, 244) !important;
      color: rgb(27, 34, 46) !important;
      width: 33.333%;
      margin-right: 4px;
      margin-bottom: 4px;
      height: 40px;
      display: flex;
      flex-direction: column;
      padding: 0px;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      font-size: 1.2rem;
      border-radius: 0px;
      font-weight: bold;
    }
    .mobile-filters-btn:hover {
      background-color: rgb(231, 231, 231) !important;
      border-color: rgb(219, 219, 219) !important;
    }
    .mobile-filters-btn-sub {
      -webkit-text-size-adjust: 100%;
      text-transform: none;
      cursor: pointer;
      text-align: center;
      font-size: 1.2rem;
      color: rgb(160, 146, 2) !important;
      line-height: 1.8rem;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 99%;
    }
    .mobile-filters-large-btn {
      margin: 0;
      overflow: visible;
      text-transform: none;
      -webkit-appearance: none;
      border-width: 1px;
      border-style: solid;
      transition: all 0.3s ease-in-out 0s;
      cursor: pointer;
      position: relative;
      text-align: center;
      line-height: 1.5rem;
      width: 50%;
      margin-right: 4px;
      margin-bottom: 4px;
      height: 40px;
      display: flex;
      flex-direction: column;
      padding: 0px;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      font-size: 1.2rem;
      border-radius: 0px;
      font-weight: bold;
      color: rgb(27, 34, 46) !important;
    }
    .mobile-options {
      color: rgb(27, 34, 46);
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      padding: 0;
      .left {
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        color: rgb(27, 34, 46);
        font-size: 1.6rem;
      }
      .sort-btn {
        margin: 0;
        overflow: visible;
        text-transform: none;
        -webkit-appearance: none;
        transition: all 0.3s ease-in-out 0s;
        position: relative;
        border-radius: 3px;
        font-size: 1.4rem;
        text-align: center;
        line-height: 1.5rem;
        display: flex;
        align-items: center;
        background: rgb(255, 255, 255) !important;
        color: rgb(27, 34, 46) !important;
        border: none;
        padding: 1px;
        height: auto;
        cursor: pointer;
      }
    }
    .mobile-filters-view {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      max-height: 100vh;
      overflow-y: auto;
      z-index: 20000;
    }
  }
`;

export default HeaderStyled;
