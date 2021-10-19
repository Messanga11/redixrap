import { useState } from "react";
import SortDropdownStyled from "./SortDropdownStyled";

const SortDropdown = ({
  filterForm,
  setFilterForm,
  getDiamondsData,
  transES,
}) => {
  const [activeSort, setActiveSort] = useState(filterForm.sortBy);

  const sortItems = [
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "price",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "shape",
      perso: {
        left: "De la Z a la A",
        right: "De la A a la Z",
      },
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "size",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "color",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "clarity",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "cut",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "polish",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "symmetry",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "lab",
      perso: null,
    },
    {
      id: Math.random() * 100 * Math.random() * Math.random(),
      name: "fluorescence Intensity",
      perso: null,
    },
  ];

  const handleClick = (name, dir) => {
    setFilterForm((state) => {
      getDiamondsData(false, {
        ...state,
        sortBy: name,
        sortDirection: dir,
      });
      return {
        ...state,
        sortBy: name,
        sortDirection: dir,
      };
    });
  };

  return (
    <SortDropdownStyled>
      <div className="sort-box">
        {sortItems.map((item) => (
          <div
            key={item.id}
            className={`sort-item ${
              filterForm.sortBy === item.name.replace(" ", "").toLowerCase()
                ? "active"
                : ""
            }`}
          >
            <button
              className="btn"
              onClick={() =>
                setActiveSort((state) => {
                  setFilterForm((state) => {
                    getDiamondsData(false, {
                      ...state,
                      sortBy: item.name.replace(" ", "").toLowerCase(),
                      sortDirection: "asc",
                    });
                    return {
                      ...state,
                      sortBy: item.name.replace(" ", "").toLowerCase(),
                      sortDirection: "asc",
                    };
                  });
                  return item.name.replace(" ", "").toLowerCase();
                })
              }
            >
              {" "}
              {
                transES[
                  item.name.charAt(0).toUpperCase() +
                    item.name.slice(1, item.name.length)
                ]
              }{" "}
            </button>{" "}
            {activeSort === item.name.replace(" ", "").toLowerCase() && (
              <div className="sort-item-sub">
                <button
                  className={`btn-left ${
                    filterForm.sortDirection === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleClick(item.name, "asc")}
                >
                  {" "}
                  {item.perso ? item.perso.left : "Bajo a alto"}{" "}
                </button>{" "}
                |{" "}
                <button
                  className={`btn-right ${
                    filterForm.sortDirection === "desc" ? "active" : ""
                  }`}
                  onClick={() => handleClick(item.name, "desc")}
                >
                  {item.perso ? item.perso.right : "Alto a bajo"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </SortDropdownStyled>
  );
};

export default SortDropdown;
