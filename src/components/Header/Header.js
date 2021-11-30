import HeaderStyled from "./HeaderStyled";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Button from "../Button/Button";
import { KeyboardArrowDown } from "@material-ui/icons";
import Filter from "../Filter/Filter";
import { useState, useCallback } from "react";
import SortDropdown from "../SortDropdown/SortDropdown";
import { useRef } from "react";

const Header = ({
  totalDiamonds,
  inTable,
  setDisplayInTable,
  filterForm,
  transES,
  resetForm,
  setFilterForm,
  getDiamondsData,
}) => {
  const [hideFilter, setHideFilter] = useState(true);
  const [showSorters, setShowSorters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const searchInputRef = useRef(null);

  const hideShowFilter = () => {
    setHideFilter((state) => !state);
  };

  const handleShowSorters = () => setShowSorters((state) => !state);

  const setIndex = (index) => {
    setSliderIndex(index);
    setHideFilter(false);
  };

  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      setFilterForm(state => ({
        ...state,
        keyword: args[0]
      }))
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounceFunction(
      (currentKeyword) => {
        getDiamondsData()
      },
      1000
    ),
    []
  );

  return (
    <HeaderStyled>
      <div className="mobile-filters mobile-view-screen">
        <div className="mobile-filters-container">
          <div className="mobile-filters-row">
            <button className="mobile-filters-btn" onClick={() => setIndex(0)}>
              Forma
              <div className="mobile-filters-btn-sub">
                {filterForm.shapes.length > 1
                  ? "Multiple"
                  : filterForm.shapes.length === 1
                  ? transES[filterForm.shapes[0]] || filterForm.shapes[0]
                  : "ANY"}
              </div>
            </button>
            <button className="mobile-filters-btn" onClick={() => setIndex(1)}>
              Tamaño
              <div className="mobile-filters-btn-sub">
                {filterForm.sizeFrom} - {filterForm.sizeTo} Ct.
              </div>
            </button>
            <button className="mobile-filters-btn" onClick={() => setIndex(2)}>
              Precio
              <div className="mobile-filters-btn-sub">
                €{" "}
                {filterForm.priceTotalFrom
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                -{" "}
                {filterForm.priceTotalTo
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </button>
          </div>
          <div className="mobile-filters-row">
            <button className="mobile-filters-btn" onClick={() => setIndex(3)}>
              Color
              <div className="mobile-filters-btn-sub">
                {filterForm.isFancyColor
                  ? filterForm.colors.fancyColors.length > 1
                    ? "Multiple"
                    : filterForm.colors.fancyColors.length === 1
                    ? transES[filterForm.colors.fancyColors[0]] ||
                      filterForm.colors.fancyColors[0]
                    : "ANY"
                  : filterForm.colors.colorFrom +
                    "-" +
                    filterForm.colors.colorTo}
              </div>
            </button>
            <button className="mobile-filters-btn" onClick={() => setIndex(4)}>
              Claridad
              <div className="mobile-filters-btn-sub">
                {filterForm.clarityFrom} - {filterForm.clarityTo}
              </div>
            </button>
            <button className="mobile-filters-btn" onClick={() => setIndex(5)}>
              Talla
              <div className="mobile-filters-btn-sub">
                {transES[filterForm.cutFrom]?.charAt(0)} -{" "}
                {transES[filterForm.cutTo]?.charAt(0)}
              </div>
            </button>
          </div>
          <div
            className={`advanced-mobile-filters ${
              showAdvancedFilters ? "show-advanced" : ""
            }`}
          >
            <div className="mobile-filters-row">
              <button
                className="mobile-filters-btn mobile-filters-large-btn"
                onClick={() => setIndex(6)}
              >
                Pulido
                <div className="mobile-filters-btn-sub">
                  {transES[filterForm.polishFrom]?.charAt(0)} -{" "}
                  {transES[filterForm.polishTo]?.charAt(0)}
                </div>
              </button>
              <button
                className="mobile-filters-btn mobile-filters-large-btn"
                onClick={() => setIndex(7)}
              >
                Simetria
                <div className="mobile-filters-btn-sub">
                  {transES[filterForm.symmetryFrom]?.charAt(0)} -{" "}
                  {transES[filterForm.symmetryTo]?.charAt(0)}
                </div>
              </button>
            </div>
            <div className="mobile-filters-row">
              <button
                className="mobile-filters-btn mobile-filters-large-btn"
                onClick={() => setIndex(8)}
              >
                Certificado
                <div className="mobile-filters-btn-sub">
                  {filterForm.labs.length > 1
                    ? "Multiple"
                    : filterForm.labs.length === 1
                    ? filterForm.labs[0]
                    : "ANY"}
                </div>
              </button>
              <button
                className="mobile-filters-btn mobile-filters-large-btn"
                onClick={() => setIndex(9)}
              >
                Fluorescencia
                <div className="mobile-filters-btn-sub">
                  {filterForm.fluorescenceIntensities.length > 1
                    ? "Multiple"
                    : filterForm.fluorescenceIntensities.length === 1
                    ? filterForm.fluorescenceIntensities[0]
                    : "ANY"}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div
          className="advanced"
          onClick={() => setShowAdvancedFilters((state) => !state)}
        >
          Opciones Avanzadas{" "}
          <KeyboardArrowDown
            className="icon"
            style={{
              transform: `${showAdvancedFilters ? "rotate(180deg)" : ""}`,
            }}
          />
        </div>
        <div className="mobile-options">
          <div className="left">
            {totalDiamonds || 0} Diamante{totalDiamonds !== 1 && "s"}
          </div>
          {!showSearch && (
            <div
            className="mobile-search-btn"
            onClick={() => {
              searchInputRef.current?.focus();
              setShowSearch(!showSearch)
            }}
          >
              <svg
                width={20}
                height={20}
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </div>
          )}
          <button className="sort-btn" onClick={() => setShowSorters(true)}>
            Ordenar Por <KeyboardArrowDown className="icon" />
          </button>
        </div>
      </div>
      <HeaderLeft className="desktop-view-screen">
        Mostrando {totalDiamonds || 0} Diamante{totalDiamonds !== 1 && "s"}
      </HeaderLeft>
      {/* Search Input */}
      <div className={`search-bar${showSearch ? " search-bar--active" : ""}`}>
        <input
          ref={searchInputRef} type="search"
          value={filterForm.keyword}
          onChange={(e) => debounceSearch(e.target.value)}
          onBlur={() => setShowSearch(false)} />
      </div>
      <HeaderRight className="desktop-view-screen-flex">
      {!showSearch && (
        <Button
          Icon={() => (
            <svg
              width={20}
              height={20}
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          )}
          onClick={() => {
            searchInputRef.current?.focus();
            setShowSearch(!showSearch)
          }}
        />
      )}
        <Button
          Icon={
            inTable
              ? () => (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="7" height="7" fill="black" />
                    <rect x="10" width="7" height="7" fill="black" />
                    <rect y="10" width="7" height="7" fill="black" />
                    <rect x="10" y="10" width="7" height="7" fill="black" />
                  </svg>
                )
              : () => (
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="18" height="3" fill="black" />
                    <rect y="7" width="18" height="3" fill="black" />
                    <rect y="14" width="18" height="3" fill="black" />
                  </svg>
                )
          }
          onClick={setDisplayInTable}
        />
        <Button
          Icon={() => (
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="9" width="10" height="3" fill="black" />
              <rect
                x="6"
                width="14"
                height="3"
                transform="rotate(90 6 0)"
                fill="black"
              />
              <rect x="9" y="6" width="7" height="3" fill="black" />
              <rect x="9" y="13" width="4" height="3" fill="black" />
              <path
                d="M4.5 15.9091L0.602886 12.2272H8.39711L4.5 15.9091Z"
                fill="black"
              />
            </svg>
          )}
          setShowSorters={handleShowSorters}
          setFilterForm={setFilterForm}
          getDiamondsData={getDiamondsData}
        />
        <Button
          text="Filtros"
          Icon={KeyboardArrowDown}
          rotate={!hideFilter}
          altern={true}
          colored={true}
          onClick={hideShowFilter}
        />
      </HeaderRight>
      {showSorters && (
        <div className={`sorters ${showSorters ? "slide-on-mobile" : ""}`}>
          <div className="close-sorters" onClick={() => setShowSorters(false)}>
            &times;
          </div>
          <SortDropdown
            filterForm={filterForm}
            setFilterForm={setFilterForm}
            getDiamondsData={getDiamondsData}
            transES={transES}
          />
        </div>
      )}
      <Filter
        className={`${!hideFilter && "show mobile-filters-view"}`}
        filterForm={filterForm}
        setFilterForm={setFilterForm}
        resetForm={resetForm}
        getDiamondsData={getDiamondsData}
        transES={transES}
        setHideFilters={setHideFilter}
        totalDiamonds={totalDiamonds}
        sliderIndex={sliderIndex}
        setSliderIndex={setSliderIndex}
      />
    </HeaderStyled>
  );
};

export default Header;
