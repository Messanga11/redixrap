import DiamondsStyled from "./DiamondsStyled";
import Diamond from "../Diamond/Diamond";
import TableDiamonds from "./TableDiamonds";
import Infos from "./Infos";
import { KeyboardArrowDown } from "@material-ui/icons";
import { useState } from "react";
import Error from "../Error/Error";

const Diamonds = ({
  setDiamond,
  diamondsData,
  error,
  transES,
  inTable,
  filterForm,
  setFilterForm,
  resetForm,
  getDiamondsData,
  loading,
  ...otherProps
}) => {
  const [asc, setAsc] = useState(false);

  const setSort = (name) => {
    if (filterForm.sortBy === name) {
      setAsc((state) => !state);
    } else {
      setAsc(false);
    }
    setFilterForm((state) => {
      let form = {
        ...state,
        sortBy: name,
        sortDirection: asc ? "asc" : "desc",
      };
      getDiamondsData(false, form);
      return form;
    });
  };

  return error ? (
    <Error>
      <Infos>{error}</Infos>
      <Infos>
        Por favor{" "}
        <span className="link" onClick={resetForm}>
          recargar.
        </span>
      </Infos>
    </Error>
  ) : diamondsData?.length <= 0 ? (
    <Error>
      <Infos>No encontramos diamantes que casen con tu b&#250;squeda.</Infos>
      <Infos>
        Por favor, ampl&#237;a tus criterios o{" "}
        <span className="link" onClick={resetForm}>
          reinicia tus filtros.
        </span>
      </Infos>
    </Error>
  ) : (
    <>
      <DiamondsStyled
        className={inTable ? "hide" : ""}
        style={{ opacity: `${loading ? "0.4" : "1"}` }}
        {...otherProps}
      >
        {diamondsData instanceof Array
          ? diamondsData?.map((diamond) => (
              <Diamond
                key={"diamond" + Math.random() * Math.random() + diamond.id}
                infos={diamond}
                onClick={() => setDiamond(diamond)}
                transES={transES}
                filterForm={filterForm}
              />
            ))
          : ""}
      </DiamondsStyled>
      <TableDiamonds
        className={!inTable ? "hide" : ""}
        style={{ opacity: `${loading ? "0.4" : "1"}` }}
      >
        <div className="table-header">
          <div
            className={`table-col ${
              filterForm.sortBy === "shape"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("shape")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "shape" && <KeyboardArrowDown />}Forma
            </div>
            <div className="table-col-sub" title="ANY">
              {filterForm.shapes.length > 1
                ? "Multiple"
                : filterForm.shapes.length === 1
                ? filterForm.shapes[0]
                : "ANY"}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "size"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("size")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "size" && <KeyboardArrowDown />}Tamaño
            </div>
            <div className="table-col-sub" title="ANY">
              {filterForm.sizeFrom} - {filterForm.sizeTo} Ct.
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "color"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("color")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "color" && <KeyboardArrowDown />}Color
            </div>
            <div className="table-col-sub" title="ANY">
              {filterForm.colors.colorFrom} - {filterForm.colors.colorTo}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "clarity"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("clarity")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "clarity" && <KeyboardArrowDown />}Claridad
            </div>
            <div className="table-col-sub" title="ANY">
              {filterForm.clarityFrom} - {filterForm.clarityTo}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "cut"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("cut")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "cut" && <KeyboardArrowDown />}Talla
            </div>
            <div className="table-col-sub" title="ANY">
              {transES[filterForm.cutFrom]?.charAt(0)} -{" "}
              {transES[filterForm.cutTo]?.charAt(0)}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "polish"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("polish")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "polish" && <KeyboardArrowDown />}Pulido
            </div>
            <div className="table-col-sub" title="ANY">
              {transES[filterForm.polishFrom]?.charAt(0)} -{" "}
              {transES[filterForm.polishTo]?.charAt(0)}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "symmetry"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("symmetry")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "symmetry" && <KeyboardArrowDown />}
              Symmetria
            </div>
            <div className="table-col-sub" title="ANY">
              {transES[filterForm.symmetryFrom]?.charAt(0)} -{" "}
              {transES[filterForm.symmetryTo]?.charAt(0)}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "lab"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("lab")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "lab" && <KeyboardArrowDown />}
              Certificado
            </div>
            <div className="table-col-sub" title="ANY">
              {filterForm.labs.length > 1
                ? "Multiple"
                : filterForm.labs.length === 1
                ? filterForm.labs[0]
                : "ANY"}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "fluorescenceintensity"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("fluorescenceintensity")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "fluorescenceintensity" && (
                <KeyboardArrowDown />
              )}
              Fluorescencia
            </div>
            <div className="table-col-sub" title="ANY">
              {filterForm.fluorescenceIntensities.length > 1
                ? "Multiple"
                : filterForm.fluorescenceIntensities.length === 1
                ? filterForm.fluorescenceIntensities[0]
                : "ANY"}
            </div>
          </div>
          <div
            className={`table-col ${
              filterForm.sortBy === "price"
                ? filterForm.sortDirection === "asc"
                  ? "table-col-active"
                  : "table-col-active rotate"
                : ""
            }`}
            onClick={() => setSort("price")}
          >
            <div className="table-col-header">
              {filterForm.sortBy === "price" && <KeyboardArrowDown />}Precio
            </div>
            <div className="table-col-sub" title="ANY">
              €{" "}
              {filterForm.priceTotalFrom
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              -{" "}
              {filterForm.priceTotalTo
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
        </div>
        {diamondsData instanceof Array
          ? diamondsData?.map((infos) => (
              <div
                className="table-row"
                key={"table" + infos.id + +Math.random() * Math.random()}
                onClick={() => setDiamond(infos)}
              >
                <div className="table-col-row">{infos.shape}</div>
                <div className="table-col-row">{infos.carat}</div>
                <div className="table-col-row">
                  {infos.color.colorType === "Fancy"
                    ? transES[infos.color.fancyColor] || infos.color.fancyColor
                    : infos.color.color
                    ? infos.color.color
                    : ""}
                </div>
                <div className="table-col-row">{infos.clarity}</div>
                <div className="table-col-row">{transES[infos.cut]}</div>
                <div className="table-col-row">{transES[infos.polish]}</div>
                <div className="table-col-row">{transES[infos.symmetry]}</div>
                <div className="table-col-row">{infos.gradingReport.lab}</div>
                <div className="table-col-row">
                  {transES[infos.fluorescence.intensity]}
                </div>
                <div className="table-col-row">
                  €{" "}
                  {infos.price.totalPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </div>
            ))
          : ""}
      </TableDiamonds>
      <div>
        {loading && (
          <Infos>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                margin: "auto",
                background: "none",
                display: "block",
                shapeRendering: "auto",
                transform: "scale(0.5)",
              }}
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <g transform="translate(26.666666666666668,26.666666666666668)">
                  <rect x="-20" y="-20" width="40" height="40" fill="#e2e2e2">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.1500000000000001;1"
                      begin="-0.3s"
                    ></animateTransform>
                  </rect>
                </g>
                <g transform="translate(73.33333333333333,26.666666666666668)">
                  <rect x="-20" y="-20" width="40" height="40" fill="#e1e1e1">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.1500000000000001;1"
                      begin="-0.2s"
                    ></animateTransform>
                  </rect>
                </g>
                <g transform="translate(26.666666666666668,73.33333333333333)">
                  <rect x="-20" y="-20" width="40" height="40" fill="#e2e2e2">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.1500000000000001;1"
                      begin="0s"
                    ></animateTransform>
                  </rect>
                </g>
                <g transform="translate(73.33333333333333,73.33333333333333)">
                  <rect x="-20" y="-20" width="40" height="40" fill="#e2e2e2">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      repeatCount="indefinite"
                      dur="1s"
                      keyTimes="0;1"
                      values="1.1500000000000001;1"
                      begin="-0.1s"
                    ></animateTransform>
                  </rect>
                </g>
              </g>
            </svg>
          </Infos>
        )}
      </div>
    </>
  );
};

export default Diamonds;
