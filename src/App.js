import { useState } from "react";
import Home from "./pages/Home/Home";
import SinglePage from "./pages/SinglePage/SinglePage";

function App() {
  const [diamondToShow, setDiamondToShow] = useState(null);
  const [showSingleDiamond, setshowSingleDiamond] = useState(false);
  const initialForm = {
    shapes: [],
    sizeFrom: 0.01,
    sizeTo: 1.5,
    colors: {
      colorFrom: "M",
      colorTo: "D",
      fancyColors: [],
      searchType: "White",
    },
    clarityFrom: "I3",
    clarityTo: "IF",
    cutFrom: "Poor",
    cutTo: "Ideal",
    polishFrom: "Poor",
    polishTo: "Ideal",
    symmetryFrom: "Poor",
    symmetryTo: "Ideal",
    fluorescenceIntensities: [],
    labs: [],
    priceTotalFrom: 0,
    priceTotalTo: 4243437,
    isFancyColor: false,
    pagination: { pageNumber: 1, pageSize: 16 },
    sortBy: "price",
    sortDirection: "asc",
  };

  const [filterForm, setFilterForm] = useState(initialForm);
  const transES = {
    Poor: "Pobre",
    Fair: "Regular",
    Good: "Buena",
    Faint: "Baja",
    Medium: "Media",
    Strong: "Fuerte",
    "Very Strong": "Muy Fuerte",
    "Very Slight": "Muy Baja",
    "Very Good": "Muy Buena",
    Excellent: "Excelente",
    Ideal: "Ideal",
    None: "Ninguna",
    Price: "Precio",
    Cut: "Talla",
    Shape: "Forma",
    Size: "Tamaño",
    Color: "Color",
    Lab: "Certificado",
    Symmetry: "Symetria",
    "Fluorescence Intensity": "Fluorescencia",
    Clarity: "Claridad",
    Polish: "Pulido",
    "Cushion Modified": "Cojín Modificado",
    Cushion: "Cojín",
    Round: "Brillante",
    Princess: "Princesa",
    Emerald: "Esmeralda",
    Radiant: "Radiante",
    Pear: "Pera",
    Heart: "Corazón",
    Yellow: "Amarillo",
    Pink: "Rosa",
    Blue: "Azul",
    Red: "Rojo",
    Green: "Verde",
    Purple: "Púrpura",
    Orange: "Naranja",
    Violet: "Violeta",
    Gray: "Gris",
    Black: "Negro",
    Brown: "Marrón",
    Champagne: "Champán",
    Cognac: "Coñac",
    Chameleon: "Camaleón",
  };

  const setDiamond = (diamond) => {
    setDiamondToShow(diamond);
    setshowSingleDiamond(true);
  };

  return (
    <div className="global-wrapper">
      <Home
        transES={transES}
        setDiamond={setDiamond}
        className={`${!showSingleDiamond ? "" : "hide"}`}
        showSingleDiamond={showSingleDiamond}
        filterForm={filterForm}
        setFilterForm={setFilterForm}
        initialForm={initialForm}
      />
      {showSingleDiamond && (
        <SinglePage
          transES={transES}
          back={() => setshowSingleDiamond(false)}
          infos={diamondToShow}
          className={`${showSingleDiamond ? "" : "hide"}`}
          filterForm={filterForm}
        />
      )}
    </div>
  );
}

export default App;
