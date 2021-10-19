import PriceRangeStyled from "./PriceRangeStyled";

const PriceRange = ({
  values,
  value,
  withoutThumbs,
  leftValue,
  rightValue,
  changeLeft,
  changeRight,
  trackId,
  minValue,
  maxValue,
  getDiamondsData,
  isSingle,
  disabled,
  isSize
}) => {

  // Set the value of the left input on price range component
  const setLeftValue = () => {
    const min = minValue || 0,
      max = maxValue || 100;
    let percent = withoutThumbs
      ? values?.indexOf(value) !== -1
        ? values?.indexOf(value) * Math.fround(100 / values.length)
        : 0
      : (!disabled || typeof disabled === typeof undefined) &&
        ((leftValue - min) * 100) / (max - min);
    return percent + "%";
  };

  const setRightValue = () => {
    const min = minValue || 0,
      max = maxValue || 100;

    let percent = withoutThumbs
      ? values?.indexOf(value) !== -1
        ? (values?.indexOf(value) + 1) * Math.fround(100 / values.length)
        : 0
      : (!disabled || typeof disabled !== typeof undefined) &&
        ((rightValue - min) * 100) / (max - min);
    return 100 - percent + "%";
  };

  return (
    <PriceRangeStyled withoutThumbs={withoutThumbs}>
      <input
        type="range"
        id="input-left"
        min={minValue || 0}
        max={maxValue || 100}
        value={leftValue}
        onChange={changeLeft}
        step={values ? Math.fround(100 / values.length) : isSize ? 0.1 : 1}
        onMouseUp={getDiamondsData}
        disabled={disabled}
      />
      <input
        type="range"
        id="input-right"
        min={minValue || 0}
        max={maxValue || 100}
        value={rightValue}
        onChange={changeRight}
        step={values ? Math.fround(100 / values.length) : isSize ? 0.1 : 1}
        onMouseUp={getDiamondsData}
        disabled={disabled}
      />
      <div className="slider">
        <div className="rail"></div>
        {!isSingle || (isSingle && values?.indexOf(value) !== -1) ? (
          <div
            id={trackId}
            className="track"
            style={{
              left: `${setLeftValue()}`,
              right: `${setRightValue()}`,
            }}
          ></div>
        ) : (
          ""
        )}
        {withoutThumbs ? (
          values?.indexOf(value) !== -1 && (
            <svg
              style={{
                fontWeight: "bold",
                position: "absolute",
                top: "-450%",
                left: `calc(${
                  ((values.indexOf(value) + 1) * 100) / values.length -
                  100 / (2 * values.length)
                }%)`,
                transform: "translateX(-50%)",
              }}
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7979 15.7563C10.0152 17.1684 7.9848 17.1683 7.20213 15.7562L0.299309 3.30204C-0.460054 1.93198 0.53075 0.25 2.09718 0.25H15.9028C17.4693 0.25 18.4601 1.93198 17.7007 3.30204L10.7979 15.7563Z"
                fill="black"
              />
            </svg>
          )
        ) : (
          <>
            <div
              className="thumb left"
              style={{ left: `${setLeftValue()}` }}
            ></div>
            <div
              className="thumb right"
              style={{ right: `${setRightValue()}` }}
            ></div>
          </>
        )}
        {values &&
          Array(values.length)
            .fill()
            .map((_, i) => (
              <span
                key={i + "_" + Math.random()}
                className="mark"
                style={{ left: `calc(${((i + 1) * 100) / values.length}%)` }}
              ></span>
            ))}
        {values &&
          values.map((value, i) => (
            <span
              key={i + "value" + Math.random()}
              style={{
                fontWeight: "bold",
                position: "absolute",
                top: "250%",
                left: `calc(${
                  ((i + 1) * 100) / values.length - 100 / (2 * values.length)
                }%)`,
                transform: "translateX(-50%)",
                fontSize: "0.985em",
              }}
            >
              {value}
            </span>
          ))}
      </div>
    </PriceRangeStyled>
  );
};

export default PriceRange;
