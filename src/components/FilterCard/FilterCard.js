import FilterCardStyled from "./FilterCardStyled";

const FilterCard = ({
  title,
  isColor,
  isWhiteActive,
  setFilterForm,
  children,
  disabled,
  className,
  getDiamondsData,
}) => {
  return (
    <FilterCardStyled
      className={`${className ? className : ""} ${disabled ? "disabled" : ""}`}
    >
      <div className="title">
        <h6 className={`${isColor ? "mobile-color-header" : ""}`}>{title}</h6>
        {isColor && (
          <div className="flex mini-space mobile-color-handler">
            <span className={`${isWhiteActive && "active"}`}>Blanco</span>
            <label className={`switch ${!isWhiteActive && "activeSwitch"}`}>
              <input
                type="checkbox"
                className="checkbox"
                value={isWhiteActive}
                onChange={() =>
                  setFilterForm((state) => {
                    const form = {
                      ...state,
                      isFancyColor: !state.isFancyColor,
                      colors: {
                        ...state.colors,
                        searchType: state.isFancyColor ? "White" : "Fancy",
                      },
                    };
                    getDiamondsData(false, form);
                    return form;
                  })
                }
              />
              <span className="toggle-thumb"></span>
            </label>
            <span className={`${!isWhiteActive && "active"}`}>Fancy</span>
          </div>
        )}
      </div>
      {isColor && <div className="mobile-gap"></div>}
      {children}
    </FilterCardStyled>
  );
};

export default FilterCard;
