import Header from "../../components/Header/Header";
import Diamonds from "../../components/Diamonds/Diamonds";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCallback } from "react";

const Home = ({
  setDiamond,
  transES,
  className,
  showSingleDiamond,
  filterForm,
  setFilterForm,
  initialForm,
}) => {
  const [diamondsData, setDiamondsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [displayInTable, setDisplayInTable] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  let cancelToken = null;
  const cancelMsg = "Operation canceled due to new request.";

  const resetForm = async () => {
    await setFilterForm(initialForm);
    getDiamondsData(false, initialForm);
  };

  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  const _getDiamondsData = async (isMore = false, form = null) => {
    const loadDatas = async (form, isMore) => {
      if (cancelToken) {
        cancelToken.cancel(cancelMsg);
      }
      cancelToken = axios.CancelToken.source();
      try {
        await setLoading(true);
        await setError("");
        const { data } = await axios({
          url: "https://ii.api.prod.rapnet.com/api/Feeds/1cb0e937-bd03-429f-a7ff-920a568f02c5/DiamondsListings/v2",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: false,
          data: JSON.stringify(form),
          mode: "cors",
          cancelToken: cancelToken.token,
        });
        if (!isMore || typeof isMore === typeof undefined)
          await setDiamondsData(data);
        else
          await setDiamondsData((state) => ({
            ...state,
            data: [...state.data, ...data.data],
          }));
        await setLoading(false);
        await setIsFetching(false);
      } catch (err) {
        if (err.message !== cancelMsg) {
          setLoading(false);
          setIsFetching(false);
          if (isMore) return;
          else setError("Algo salió mal.");
        }
      }
    };

    if (!form) {
      if (!isMore || typeof isMore === typeof undefined) {
        await setFilterForm((state) => {
          const form = {
            ...state,
            pagination: {
              ...state.pagination,
              pageNumber: 1,
            },
          };
          loadDatas(form, isMore);
          return form;
        });
      } else {
        setFilterForm((state) => {
          const form = {
            ...state,
            pagination: {
              ...state.pagination,
              pageNumber: state.pagination.pageNumber + 1,
            },
          };
          loadDatas(form, isMore);
          return form;
        });
      }
    } else {
      loadDatas(form);
    }
  };

  // eslint-disable-next-line
  const getDiamondsData = useCallback(
    debounceFunction(_getDiamondsData, 500),
    []
  );

  const getMoreDatas = async () => {
    if (!isFetching && !showSingleDiamond) {
      setIsFetching(true);
      getDiamondsData(true);
    }
  };

  const getMoreDataOnScrollToBottom = (e) => {
    const diamondsEl = e.target;
    if (
      diamondsEl.scrollTop >=
      diamondsEl.scrollHeight - diamondsEl.clientHeight
    ) {
      getMoreDatas();
    }
  }

  useEffect(() => {
    getDiamondsData();

    const diamondsEl = document.getElementById("diamond-items");

    diamondsEl.addEventListener("scroll", getMoreDataOnScrollToBottom);

    return () => {
      if (cancelToken) {
        cancelToken.cancel(cancelMsg);
      }
      diamondsEl.removeEventListener("scroll", getMoreDataOnScrollToBottom);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={className} id="diamond-items">
      <Header
        totalDiamonds={diamondsData?.pagination?.totalRecordsFound || 0}
        transES={transES}
        inTable={displayInTable}
        setDisplayInTable={() => setDisplayInTable((state) => !state)}
        resetForm={resetForm}
        setFilterForm={setFilterForm}
        filterForm={filterForm}
        getDiamondsData={getDiamondsData}
      />
      <Diamonds
        resetForm={resetForm}
        setDiamond={setDiamond}
        diamondsData={diamondsData?.data}
        error={error}
        transES={transES}
        filterForm={filterForm}
        inTable={displayInTable}
        getDiamondsData={getDiamondsData}
        setFilterForm={setFilterForm}
        loading={loading}
      />
    </div>
  );
};

export default Home;
