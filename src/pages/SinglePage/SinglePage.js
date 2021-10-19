import SinglePageStyled from "./SinglePageStyled";
import { ArrowBackIos, FindInPage, ShoppingCart } from "@material-ui/icons";
import PriceRange from "../../components/PriceRange/PriceRange";
import ModalForm from "../../components/ModalForm/ModalForm";
import { useEffect, useState } from "react";
import ModalPDF from "../../components/ModalPDF/ModalPDF";
import axios from "axios";
import Error from "../../components/Error/Error";
import Infos from "../../components/Diamonds/Infos";
import ImgIndicator from "./ImgIndicator";
import ModalVideo from "../../components/ModalVideo/ModalVideo";
import MiniButton from "../../components/Filter/MiniButton";

const SinglePage = ({
  back,
  transES,
  infos: diamondToShow,
  filterForm,
  ...otherProps
}) => {
  const [infos, setInfos] = useState(null);
  const [isModalFormDisplayed, setIsModalFormDisplayed] = useState(false);
  const [isModalPDFDisplayed, setIsModalPDFDisplayed] = useState(false);
  const [isModalVideoDisplayed, setIsModalVideoDisplayed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [video, setVideo] = useState(null);

  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showModalForm = () => setIsModalFormDisplayed(true);
  const hideModalForm = () => setIsModalFormDisplayed(false);
  const showModalPDF = () => setIsModalPDFDisplayed(true);
  const hideModalPDF = () => setIsModalPDFDisplayed(false);

  const transDescES = {
    M: "Amarillo Pálido",
    D: "es el grado de color más alto que se le puede atribuir a un diamante, lo que denota que la piedra es completamente incolora (blanca); como tales, son extremadamente raros y tienen los precios más altos.",
    E: "La diferencia de color entre una piedra clasificada D y E generalmente solo es visible para un gemólogo experto que usa piedras de referencia como comparación. Sin embargo, las piedras clasificadas E son ligeramente más baratas.",
    F: "La diferencia de color entre E y F solo es visible para un gemólogo experto que utiliza piedras de referencia como comparación. Los grados F son los más bajos y, por lo tanto, los menos costosos de los colores premium.",
    G: "Los diamantes con clasificación G son casi incoloros y una ligera diferencia de color solo se vuelve perceptible en comparación con los diamantes de grados D o E. Las piedras G parecen incoloras, especialmente una vez que son empedradas y, por lo tanto, ofrecen una excelente relación calidad-precio.",
    H: "Los diamantes de color H son diamantes casi incoloros que parecen totalmente blancos o incoloros, si no son comparados junto a piedras de mayor grado en color. El color H generalmente se considera el punto de inflexión entre diamantes incoloros y diamantes ligeramente teñidos.",
    I: "Los diamantes de color I son diamantes muy ligeramente teñidos, sin embargo, una vez que se colocan en joyería, estas piedras pueden aparecer incoloras. Si está buscando maximizar su presupuesto, un diamante de color I ofrece una excelente relación calidad-precio.",
    J: "Los diamantes de color J son diamantes muy levemente teñidos, sin embargo, una vez que están engastados en joyería, especialmente en oro amarillo, es más difícil ver el ligero tinte amarillo que produce el grado J.",
    K: "Los diamantes de color K son diamantes ligeramente teñidos, sin embargo, una vez engastados en joyería, especialmente en oro amarillo, es más difícil ver el ligero tinte amarillo que produce el grado K.",
    L: "Los diamantes con este tipo de grado de menor pureza pueden estar disponibles bajo pedido especial, aunque no son tan numerosos y menos utilizados.",
    IF: "No presenta inclusiones internas visibles para un experto con una lupa de 10 aumentos, pero puede haber algunas minúsculas irregularidades externas en el acabado.",
    VVS1: "Una minúscula inclusión visible únicamente para un experto con una lupa de 10 aumentos.",
    VVS2: "Varias inclusiones minúsculas visibles únicamente para un experto con una lupa de 10 aumentos.",
    VS1: "Inclusión muy pequeña visible con una lupa de 10 aumentos.",
    VS2: "Varias inclusiones muy pequeñas visibles con una lupa de 10 aumentos.",
    SI1: "Inclusión pequeña visible con una lupa de 10 aumentos.",
    SI2: "Varias inclusiones pequeñas visibles con una lupa de 10 aumentos.",
    I1: "Inclusión que resulta visible a simple vista.",
    I2: "Numerosas inclusiones claramente visibles a simple vista que también disminuyen el brillo.",
    I3: "Numerosas inclusiones claramente visibles a simple vista que disminuyen el brillo y comprometen la estructura del diamante, haciendo que pueda agrietarse o romperse más fácilmente.",
    Ideal:
      "Los diamantes clasificados como Excelentes o Ideales son los más brillantes y están considerados los de mayor calidad. La luz se mueve a través de los cortes del diamante y hace resplandecer la piedra a simple vista.",
    "Very Good":
      "Los diamantes clasificados como Muy Buenos ofrecen un poco menos de brillo y centelleo que el corte Excelente. Sin embargo, como la diferencia entre los dos es casi indistinguible a simple vista, los cortes muy buenos ofrecen una mejor relación calidad-precio que los diamantes de corte excelente.",
    Good: 'Los diamantes clasificados como "Buenos" generalmente permiten que se escape algo de luz durante el proceso de refracción, aunque una vez más, la diferencia entre este y los diamantes de corte muy buenos es pequeña, por lo tanto, los buenos cortes ofrecen una excelente relación calidad-precio y son una opción más asequible.',
    Faint: "Débil",
    Poor: "La luz que se mueve a través de un diamante de corte superficial o bajo se pierde en el fondo de la piedra y la falta de luz hace que los diamantes de corte superficial parezcan sin vida. La luz que se mueve a través de un diamante de corte profundo o elevado se escapa por los lados, oscureciendo todas o la mayoría de las partes de la piedra. El brillo de bajo rendimiento de los diamantes clasificados como corte aceptable o pobre puede ser notable para el ojo inexperto, y por esta razón también son menos costosos.",
  };
  let cancelToken = null;
  const cancelMsg = "Canceled!";

  const playIfVideo = () => {
    if (video) {
      setIsModalVideoDisplayed(true);
    }
  };

  const getDiamond = async () => {
    if (cancelToken) {
      cancelToken.cancel(cancelMsg);
    }
    cancelToken = axios.CancelToken.source();
    try {
      setError("");
      setLoading(true);
      const { data } = await axios({
        cancelToken: cancelToken.token,
        url:
          "https://ii.api.prod.rapnet.com/api/Feeds/1cb0e937-bd03-429f-a7ff-920a568f02c5/DiamondsListings/" +
          diamondToShow.feedListingId,
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        },
        referrer:
          "https://ii.api.prod.rapnet.com/api/Feeds/1cb0e937-bd03-429f-a7ff-920a568f02c5/Widget",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        withCredentials: false,
      });
      setInfos((state) => {
        const infos = data.data;
        if (infos.diamondMedia[0]?.type === "Video")
          setVideo(infos.diamondMedia[0]?.url);
        setCurrentImageUrl(
          (infos?.diamondMedia?.length > 0 &&
            infos.diamondMedia[0]?.type === "Image" &&
            infos.diamondMedia[0]?.url) ||
            (infos.diamondMedia?.map((el) => el.type).includes("Video") &&
              `https://instantinventory-widgets-cl59s.s3.us-east-1.amazonaws.com/diamonds/1.0.0/src/assets/images/${
                infos?.shape?.toLowerCase()?.split(" modified")[0]
              }-${
                infos?.shape === "Round"
                  ? "White"
                  : infos?.color.colorType === "White"
                  ? "White"
                  : infos?.color.fancyColor === "Yellow"
                  ? "FancyYellow"
                  : "White"
              }-Video.${
                infos?.shape === "Round"
                  ? "dd3bd09be1629c7f020a14228cf17346"
                  : infos?.shape === "Asscher"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "b668ad48bdf80ab881523b5ce08e4927"
                    : "29187dcaaa03a357b108f52a7c6e1845"
                  : infos?.shape === "Princess"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "5e5ac84869492fbc56d41198cebb7973"
                    : "867831949eaf9d8187ed873bb15c9fd0"
                  : infos?.shape === "Emerald"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "d180764f6b680c34bfb55b22e7e7bcec"
                    : "3191b51b565a7451a6855c759b0db3fd"
                  : infos?.shape === "Cushion" ||
                    infos?.shape === "Cushion Modified"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "f805ca415a4b0e2b6333e0054b971bcf"
                    : "0ea50afcb8efe64175ab8eac0e6c5cd2"
                  : infos?.shape === "Radiant"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "94681d6643991cc51477343d5b89a7c4"
                    : "6463444c244d64eafe268f8ecaf0e0e8"
                  : infos?.shape === "Pear"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "01c57e8e1ccd2af74a8487e7ed6d3502"
                    : "d15297cc1785bbdd0da241d371c6078a"
                  : infos?.shape === "Oval"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "fcf94cc8f0f8d70a8c7e020fa998bc99"
                    : "5dc94e59137a28353d3c6be472c56bfc"
                  : infos?.shape === "Marquise"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "3ac1976d6c3de87dbb599d8e1f302721"
                    : "30f75414f05a8cfb4530bdad06a7fae5"
                  : infos?.shape === "Heart"
                  ? !infos?.color.fancyColor ||
                    infos?.color.fancyColor !== "Yellow"
                    ? "13558d110b84c15080bf6622765d4300"
                    : "f2074eb2bda1fd46eae61619ae7d3b3a"
                  : ""
              }.jpg`) ||
            `https://instantinventory-widgets-cl59s.s3.us-east-1.amazonaws.com/diamonds/1.0.0/src/assets/images/${
              infos.shape.toLowerCase().split(" modified")[0]
            }-${
              infos.shape === "Round"
                ? "White"
                : !infos.color.fancyColor ||
                  infos.color.fancyColor !== "Yellow" ||
                  infos.color.fancyColor !== "Yellow"
                ? "White"
                : "FancyYellow"
            }-Image.${
              infos.shape === "Round"
                ? "d3b6de8e671428a23b2a9293890b4d03"
                : infos.shape === "Asscher"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "a7dac22ec4b1626fa29c24e74fa58f23"
                  : "5f998f00b208420505eb04dc1b10f580"
                : infos.shape === "Princess"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "74b8d610c9801a2e9d731fc354fe9777"
                  : ""
                : infos.shape === "Emerald"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "839813333ef15e2dca7b7c0396232ef5"
                  : "cc7b0b19b630dd33f8d2976f17c380a0"
                : infos.shape === "Cushion" ||
                  infos.shape === "Cushion Modified"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "ce47739142d9ac6ddbecfd6222acb2fc"
                  : "900cfb75eb9d01c293fca40340522ce7"
                : infos.shape === "Radiant"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "0f968997819d48346d91c36f16aa0bb0"
                  : "6a194ac3dcf4d56881112d0063851ecd"
                : infos.shape === "Pear"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "b0f4c19acbf7954d09bc57e89bc044c5"
                  : "16304a1cefc486d1100283facaa1b59e"
                : infos.shape === "Oval"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "04154d8d0c85300526037c3c6b24a350"
                  : "c1a2e8e844142a8da40ae91734c968e7"
                : infos.shape === "Marquise"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "30f814cd9f5e7a8f03ade995382d1ae0"
                  : "dc489265b2ac30fe1ed7368d06bb95d1"
                : infos.shape === "Heart"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "9ed43d40e8fe9e0afe775f959cb76728"
                  : "38812ddf3648a4ab9258674d7c91420a"
                : ""
            }.jpg`
        );
        return infos;
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "Algo salió mal.");
    }
  };

  useEffect(() => {
    getDiamond();
    return () => {
      if (cancelToken) {
        cancelToken.cancel(cancelMsg);
      }
    };
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <div className="loading-wrapper">
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
    </div>
  ) : error ? (
    <Error>
      <Infos>{error}</Infos>
      <Infos>
        Por favor{" "}
        <span className="link" onClick={getDiamond}>
          recargar.
        </span>
      </Infos>
    </Error>
  ) : (
    infos && (
      <div {...otherProps}>
        <SinglePageStyled>
          {isModalVideoDisplayed && (
            <div className="modal-video-wrapper">
              <ModalVideo
                url={video}
                hideModalVideo={() => setIsModalVideoDisplayed(false)}
              />
            </div>
          )}
          {isModalPDFDisplayed && (
            <div className="modal-PDF-wrapper">
              <ModalPDF
                url={infos?.gradingReport?.certificateURL[0]}
                hideModalPDF={hideModalPDF}
              />
            </div>
          )}
          {isModalFormDisplayed && (
            <ModalForm
              feedListingId={infos?.feedListingId}
              closeModal={hideModalForm}
            />
          )}
          <div className="back" onClick={back}>
            <ArrowBackIos />
            Volver a resultados
          </div>
          <div className="imgs-wapper">
            <div className="img-container">
              <img src={currentImageUrl} onClick={playIfVideo} alt="Diamante" />
            </div>
            <div className="img-indicators small-indicators">
              {infos?.diamondMedia?.map((media, i) => (
                <ImgIndicator
                  key={
                    "diamondMedia" +
                    Math.random() +
                    Math.random() * Math.random()
                  }
                  onClick={() => {
                    setCurrentImageIndex(i);
                    setCurrentImageUrl(
                      (media?.type === "Image" && media?.url) ||
                        (media.type === "Video" &&
                          `https://instantinventory-widgets-cl59s.s3.us-east-1.amazonaws.com/diamonds/1.0.0/src/assets/images/${
                            infos.shape.toLowerCase().split(" modified")[0]
                          }-${
                            infos.shape === "Round"
                              ? "White"
                              : infos.color.colorType === "White"
                              ? "White"
                              : infos.color.fancyColor === "Yellow"
                              ? "FancyYellow"
                              : "White"
                          }-Video.${
                            infos.shape === "Round"
                              ? "dd3bd09be1629c7f020a14228cf17346"
                              : infos.shape === "Asscher"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "b668ad48bdf80ab881523b5ce08e4927"
                                : "29187dcaaa03a357b108f52a7c6e1845"
                              : infos.shape === "Princess"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "5e5ac84869492fbc56d41198cebb7973"
                                : "867831949eaf9d8187ed873bb15c9fd0"
                              : infos.shape === "Emerald"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "d180764f6b680c34bfb55b22e7e7bcec"
                                : "3191b51b565a7451a6855c759b0db3fd"
                              : infos.shape === "Cushion" ||
                                infos.shape === "Cushion Modified"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "f805ca415a4b0e2b6333e0054b971bcf"
                                : "0ea50afcb8efe64175ab8eac0e6c5cd2"
                              : infos.shape === "Radiant"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "94681d6643991cc51477343d5b89a7c4"
                                : "6463444c244d64eafe268f8ecaf0e0e8"
                              : infos.shape === "Pear"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "01c57e8e1ccd2af74a8487e7ed6d3502"
                                : "d15297cc1785bbdd0da241d371c6078a"
                              : infos.shape === "Oval"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "fcf94cc8f0f8d70a8c7e020fa998bc99"
                                : "5dc94e59137a28353d3c6be472c56bfc"
                              : infos.shape === "Marquise"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "3ac1976d6c3de87dbb599d8e1f302721"
                                : "30f75414f05a8cfb4530bdad06a7fae5"
                              : infos.shape === "Heart"
                              ? !infos.color.fancyColor ||
                                infos.color.fancyColor !== "Yellow"
                                ? "13558d110b84c15080bf6622765d4300"
                                : "f2074eb2bda1fd46eae61619ae7d3b3a"
                              : ""
                          }.jpg`) ||
                        ""
                    );
                    if (media.type === "Video") setVideo(media.url);
                    else setVideo(null);
                  }}
                  className={`small-indicator ${
                    currentImageIndex === i ? "small-indicator-active" : ""
                  }`}
                >
                  <img
                    alt="Diamante"
                    src={
                      (media?.type === "Image" && media?.url) ||
                      (media.type === "Video" &&
                        `https://instantinventory-widgets-cl59s.s3.us-east-1.amazonaws.com/diamonds/1.0.0/src/assets/images/${
                          infos.shape.toLowerCase().split(" modified")[0]
                        }-${
                          infos.shape === "Round"
                            ? "White"
                            : infos.color.colorType === "White"
                            ? "White"
                            : infos.color.fancyColor === "Yellow"
                            ? "FancyYellow"
                            : "White"
                        }-Video.${
                          infos.shape === "Round"
                            ? "dd3bd09be1629c7f020a14228cf17346"
                            : infos.shape === "Asscher"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "b668ad48bdf80ab881523b5ce08e4927"
                              : "29187dcaaa03a357b108f52a7c6e1845"
                            : infos.shape === "Princess"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "5e5ac84869492fbc56d41198cebb7973"
                              : "867831949eaf9d8187ed873bb15c9fd0"
                            : infos.shape === "Emerald"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "d180764f6b680c34bfb55b22e7e7bcec"
                              : "3191b51b565a7451a6855c759b0db3fd"
                            : infos.shape === "Cushion" ||
                              infos.shape === "Cushion Modified"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "f805ca415a4b0e2b6333e0054b971bcf"
                              : "0ea50afcb8efe64175ab8eac0e6c5cd2"
                            : infos.shape === "Radiant"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "94681d6643991cc51477343d5b89a7c4"
                              : "6463444c244d64eafe268f8ecaf0e0e8"
                            : infos.shape === "Pear"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "01c57e8e1ccd2af74a8487e7ed6d3502"
                              : "d15297cc1785bbdd0da241d371c6078a"
                            : infos.shape === "Oval"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "fcf94cc8f0f8d70a8c7e020fa998bc99"
                              : "5dc94e59137a28353d3c6be472c56bfc"
                            : infos.shape === "Marquise"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "3ac1976d6c3de87dbb599d8e1f302721"
                              : "30f75414f05a8cfb4530bdad06a7fae5"
                            : infos.shape === "Heart"
                            ? !infos.color.fancyColor ||
                              infos.color.fancyColor !== "Yellow"
                              ? "13558d110b84c15080bf6622765d4300"
                              : "f2074eb2bda1fd46eae61619ae7d3b3a"
                            : ""
                        }.jpg`) ||
                      ""
                    }
                  />
                </ImgIndicator>
              ))}
            </div>
          </div>
          <div className="desc">
            <h2 className="title">
              {transES[infos.shape]
                ? transES[infos.shape] + ","
                : infos.shape + ","}{" "}
              {infos.carat}Ct.,{" "}
              {filterForm.colorType === "Fancy"
                ? transES[infos.color.fancyColor] ||
                  infos.color.fancyColor + ","
                : infos.color.color
                ? infos.color.color + ","
                : ""}{" "}
              {infos.clarity}
              <p>
                {infos.cut
                  ? transES[infos.cut]
                    ? transES[infos.cut] + " Diamante Tallado"
                    : infos.cut + " Diamante Tallado"
                  : ""}
              </p>
            </h2>
            <div className="sub">
              <span>Certificado {infos?.gradingReport?.lab}</span>
              {infos?.gradingReport?.certificateURL[0] && (
                <span className="report" onClick={showModalPDF}>
                  <FindInPage /> Abrir Certificado
                </span>
              )}
            </div>
            <p className="price">
              €{" "}
              {infos?.price?.totalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <div className="btns">
              <button className="add-btn">
                <ShoppingCart />
                <span>&nbsp;&nbsp;Comprar</span>
              </button>
              <button className="make-btn" onClick={showModalForm}>
                Consultar
              </button>
            </div>
          </div>
          <div className="details">
            <h6>Detailes Diamante</h6>
            <div className="flex-infos">
              <table>
                <tbody>
                  {infos?.stockNumber ? (
                    <tr>
                      <td className="info">N° Stock</td>
                      <td className="value">{infos?.stockNumber}</td>
                    </tr>
                  ) : null}
                  {infos?.gradingReport?.lab ? (
                    <tr>
                      <td className="info">Certificado</td>
                      <td className="value">{infos?.gradingReport?.lab}</td>
                    </tr>
                  ) : null}
                  {infos?.carat ? (
                    <tr>
                      <td className="info">Peso en Ct.</td>
                      <td className="value">{infos?.carat}</td>
                    </tr>
                  ) : null}
                  {infos?.cut ? (
                    <tr>
                      <td className="info">Corte</td>
                      <td className="value">{infos?.cut}</td>
                    </tr>
                  ) : null}
                  {infos?.color?.color ? (
                    <tr>
                      <td className="info">Color</td>
                      <td className="value">{infos?.color?.color}</td>
                    </tr>
                  ) : null}
                  {infos?.clarity ? (
                    <tr>
                      <td className="info">Claridad</td>
                      <td className="value">{infos?.clarity}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
              <table>
                <tbody>
                  {infos?.depthPct ? (
                    <tr>
                      <td className="info">Profundidad %</td>
                      <td className="value">{infos?.depthPct}%</td>
                    </tr>
                  ) : null}
                  {infos?.tablePct ? (
                    <tr>
                      <td className="info">Tabla %</td>
                      <td className="value">{infos?.tablePct}%</td>
                    </tr>
                  ) : null}
                  {infos?.polish ? (
                    <tr>
                      <td className="info">Pulido</td>
                      <td className="value">{infos?.polish}</td>
                    </tr>
                  ) : null}
                  {infos?.symmetry ? (
                    <tr>
                      <td className="info">Simetria</td>
                      <td className="value">{infos?.symmetry}</td>
                    </tr>
                  ) : null}
                  {infos?.girdleMax && infos?.girdleMin ? (
                    <tr>
                      <td className="info">Girdle</td>
                      <td className="value">
                        {infos?.girdleMin} to {infos?.girdleMax}
                        {infos.girdlePct ? infos.girdlePct : ""}
                      </td>
                    </tr>
                  ) : null}
                  {infos?.culetSize ? (
                    <tr>
                      <td className="info">Culet</td>
                      <td className="value">{infos?.culetSize}</td>
                    </tr>
                  ) : null}
                  {infos?.fluorescence?.intensity ? (
                    <tr>
                      <td className="info">Fluorescencia</td>
                      <td className="value">
                        {infos?.fluorescence?.intensity}
                      </td>
                    </tr>
                  ) : null}
                  {infos?.measurements?.length &&
                  infos?.measurements?.width &&
                  infos?.measurements?.depth ? (
                    <tr>
                      <td className="info">Medidas</td>
                      <td className="value">
                        {infos?.measurements?.length} x{" "}
                        {infos?.measurements?.width} x{" "}
                        {infos?.measurements?.depth} MM
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
          <div className="color">
            <h6>Color</h6>
            <div className="flex-infos">
              {infos.color.fancyColor ? (
                <div className="icon-list fancy">
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Yellow" && "active-fancy"
                    }
                    content="Amarillo"
                  >
                    <span>
                      <svg
                        width="33"
                        height="35"
                        viewBox="0 0 33 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.3082 17.6374C32.3082 27.1725 25.4256 34.3453 16.4252 34.9022C7.42479 34.3453 1.07157 27.1052 0.0126953 17.6374C0.54213 8.16953 7.42479 0.929429 16.4252 0.372498C24.8961 0.929429 32.3082 8.10224 32.3082 17.6374Z"
                          fill="#F5CC21"
                        />
                        <path
                          d="M32.8376 17.6255C32.7695 27.2554 25.4146 34.9498 16.4025 34.902C7.34501 34.8542 0.0354507 27.3988 0.0127503 17.6733C-0.00995023 8.18683 7.0045 0.420779 16.4252 0.372988C25.5962 0.301302 32.7014 8.09124 32.8376 17.6255ZM8.50273 17.6017C8.54813 17.7211 8.57083 17.8406 8.61623 17.9362C9.29725 19.6806 9.97826 21.4249 10.682 23.1693C10.7728 23.3844 10.9998 23.5994 11.2268 23.695C12.8158 24.4119 14.4276 25.1048 16.0393 25.7978C16.2436 25.8934 16.5614 25.8934 16.7884 25.7978C18.4228 25.1048 20.0346 24.388 21.6463 23.6472C21.8506 23.5516 22.0776 23.3127 22.1684 23.0737C22.8494 21.401 23.5304 19.7045 24.1888 18.0079C24.2796 17.7928 24.2796 17.4822 24.1888 17.291C23.5304 15.5466 22.8494 13.8262 22.1457 12.1057C22.0549 11.8906 21.8506 11.6756 21.6463 11.6039C20.0346 10.8631 18.4228 10.1463 16.7884 9.45328C16.5614 9.3577 16.2209 9.3577 15.9939 9.45328C14.4049 10.1224 12.8158 10.7914 11.2268 11.5322C10.9771 11.6517 10.7047 11.9145 10.5912 12.2013C9.91016 13.8501 9.29725 15.4989 8.66163 17.1715C8.59353 17.291 8.54813 17.4583 8.50273 17.6017ZM12.1575 29.0954C13.6103 30.6247 15.0632 32.1301 16.4252 33.5877C17.7418 32.1779 19.1039 30.7203 20.4659 29.2388C19.2401 28.498 17.9461 27.6856 16.6295 26.897C16.4933 26.8014 16.2209 26.8492 16.062 26.9209C15.4037 27.2554 14.7454 27.6378 14.1097 27.9962C13.4287 28.3785 12.7477 28.7609 12.1575 29.0954ZM27.6619 13.3483C26.7993 14.7581 25.9821 16.0962 25.2103 17.4344C25.1422 17.5539 25.1876 17.8167 25.2784 17.9601C26.0048 19.2265 26.7312 20.4691 27.4576 21.7117C27.503 21.8073 27.5938 21.879 27.6846 21.9745C29.1375 20.5169 30.5676 19.0832 32.0204 17.6017C30.5449 16.1679 29.1375 14.782 27.6619 13.3483ZM5.12036 21.9267C5.18846 21.8073 5.21116 21.7595 5.25656 21.6878C6.00568 20.4213 6.77749 19.1788 7.52661 17.9123C7.61741 17.745 7.57201 17.4105 7.45851 17.2432C6.9137 16.3113 6.34618 15.4033 5.80137 14.4713C5.57437 14.1129 5.34736 13.7545 5.09766 13.3722C3.62213 14.8298 2.2147 16.2157 0.761867 17.6494C2.2147 19.0832 3.64483 20.4691 5.12036 21.9267ZM12.2029 5.94065C13.5649 6.75309 14.8589 7.54164 16.1528 8.3063C16.3117 8.40188 16.5841 8.35409 16.7657 8.25851C17.9007 7.56554 19.0358 6.82478 20.1708 6.10791C20.2843 6.03622 20.3524 5.94064 20.534 5.77338C19.1039 4.36354 17.6964 2.9776 16.4025 1.71114C15.0632 3.04929 13.6557 4.45913 12.2029 5.94065ZM10.3869 6.29908C8.66164 6.22739 6.9137 6.15571 5.09766 6.06012C5.21116 7.94787 5.32466 9.71613 5.46087 11.4844C7.0953 9.76392 8.72974 8.06735 10.3869 6.29908ZM27.2533 23.9818C25.687 25.6067 24.0753 27.2793 22.3727 29.0237C23.6667 29.0237 24.9606 28.9998 26.2318 29.0237C27.4349 29.0476 27.4349 29.0715 27.4122 27.8289C27.4122 27.4705 27.4122 27.1121 27.3895 26.7536C27.3441 25.7739 27.2987 24.7942 27.2533 23.9818ZM27.3668 11.5322C27.3668 9.71614 27.3668 7.97177 27.3668 6.29908C25.7097 6.29908 24.0526 6.29908 22.3954 6.29908C24.0299 8.04345 25.6416 9.71614 27.3668 11.5322ZM10.0691 28.7848C8.54813 27.1599 7.0045 25.4872 5.41547 23.8145C5.41547 25.4872 5.41547 27.2077 5.41547 28.9998C7.0272 28.9281 8.63894 28.8564 10.0691 28.7848ZM15.2448 34.1374C13.9962 32.8231 12.7023 31.4611 11.3857 30.0751C10.9998 30.9115 10.5912 31.8434 10.1599 32.8231C11.8624 33.6355 13.5649 34.0657 15.2448 34.1374ZM27.0717 12.9898C25.6189 12.6314 24.2569 12.2969 22.804 11.9145C23.4623 13.6111 24.0753 15.1643 24.7336 16.837C25.5508 15.5227 26.2772 14.3041 27.0717 12.9898ZM9.97826 23.2649C9.31995 21.5922 8.70703 20.039 8.04872 18.3663C7.2315 19.7284 6.50509 20.947 5.71057 22.2374C7.1407 22.5958 8.50273 22.9065 9.97826 23.2649ZM11.8397 6.53803C11.5446 7.99566 11.2949 9.3816 10.9771 10.9348C12.6115 10.2179 14.087 9.54887 15.6988 8.832C14.3368 8.01956 13.1336 7.30269 11.8397 6.53803ZM24.7336 18.3902C24.0753 20.0629 23.4623 21.6161 22.804 23.2888C24.2569 22.9543 25.5962 22.6436 27.0263 22.333C26.2545 21.0187 25.5281 19.7523 24.7336 18.3902ZM21.6009 5.48663C23.4396 5.48663 25.2103 5.48663 26.9582 5.48663C25.7778 4.17238 24.4158 3.19266 22.8267 2.4758C22.3954 3.5033 22.0095 4.48302 21.6009 5.48663ZM9.97826 11.9623C8.50273 12.3207 7.1634 12.6553 5.73327 13.0137C6.50509 14.328 7.23151 15.5466 8.02602 16.8848C8.68434 15.1882 9.29725 13.635 9.97826 11.9623ZM26.595 12.1535C24.9152 10.3852 23.2353 8.61694 21.5782 6.87257C21.8733 8.16293 22.1684 9.54887 22.4862 10.9109C22.5089 11.0304 22.6224 11.1499 22.7359 11.1977C24.0299 11.5083 25.3238 11.8189 26.595 12.1535ZM6.14188 12.1535C6.23268 12.1296 6.39159 12.1296 6.55049 12.0818C7.59471 11.8189 8.63893 11.5322 9.68316 11.3171C10.1145 11.2216 10.2961 11.0065 10.3415 10.6003C10.3642 10.433 10.4096 10.2896 10.4323 10.1224C10.6366 9.07096 10.8409 7.99566 11.0452 6.96815C9.41075 8.71252 7.77631 10.433 6.14188 12.1535ZM20.9426 28.737C21.2377 27.2315 21.5101 25.8695 21.8279 24.3402C20.2389 25.0571 18.7633 25.7022 17.1743 26.4191C18.4682 27.2076 19.6487 27.9484 20.9426 28.737ZM11.59 5.1043C12.8839 3.71836 14.1097 2.40411 15.3356 1.06596C13.6557 1.18544 11.9986 1.56777 10.3869 2.30853C10.7955 3.26435 11.1814 4.17238 11.59 5.1043ZM17.1289 8.832C18.7406 9.52497 20.1935 10.1701 21.8052 10.887C21.442 9.3338 21.1469 7.97176 20.8064 6.51414C19.5806 7.27879 18.4228 8.01956 17.1289 8.832ZM26.9355 29.8839C26.9128 29.8362 26.9128 29.7645 26.8901 29.7167C25.1876 29.7167 23.485 29.7167 21.7144 29.7167C22.1457 30.7203 22.5316 31.7 22.9629 32.6797C24.4612 31.9151 25.8005 31.0787 26.9355 29.8839ZM10.9544 28.1157C10.7501 26.9448 10.5231 25.7261 10.3188 24.4836C10.2507 24.1012 10.0691 24.0056 9.77396 23.934C8.66163 23.6711 7.57201 23.3844 6.45969 23.1215C6.34619 23.0976 6.20998 23.0976 6.20998 23.0976C7.75361 24.7464 9.36535 26.4191 10.9544 28.1157ZM21.2604 30.3141C20.0119 31.6283 18.7633 32.9426 17.6056 34.1612C19.1266 34.0418 20.761 33.6833 22.35 32.9426C21.9414 31.9629 21.5555 31.0548 21.2604 30.3141ZM26.5723 23.241C26.5723 23.241 26.5269 23.1932 26.5042 23.1932C25.2557 23.4799 24.0072 23.7667 22.7359 24.0534C22.6451 24.0773 22.5316 24.2207 22.5089 24.3402C22.2365 25.6544 21.9868 26.9687 21.7371 28.2113C23.3261 26.5625 24.9379 24.9137 26.5723 23.241ZM11.7035 28.5458C13.0428 27.805 14.2687 27.1121 15.5626 26.3952C13.9962 25.7261 12.5434 25.1048 10.9771 24.4119C11.2268 25.8217 11.4538 27.136 11.7035 28.5458ZM30.9535 10.8631C30.0455 9.4055 29.2056 8.01956 28.3656 6.65751C28.2748 6.68141 28.184 6.7292 28.0932 6.75309C28.0932 8.54526 28.0932 10.3135 28.0932 12.1774C28.9559 11.795 29.8639 11.3649 30.9535 10.8631ZM32.0885 18.8442C30.9081 20.0868 29.705 21.3532 28.4792 22.6197C29.251 23.002 30.0909 23.4083 30.9989 23.8384C31.6118 22.1418 32.0431 20.493 32.0885 18.8442ZM4.71175 28.5458C4.71175 26.7058 4.71175 24.9137 4.71175 23.0976C4.25774 23.3127 3.80373 23.5038 3.37242 23.7189C2.91841 23.934 2.4644 24.149 2.01039 24.3641C2.4417 25.6544 3.93994 27.9962 4.71175 28.5458ZM9.54695 32.5125C10.001 31.5088 10.4323 30.5291 10.909 29.4538C9.11564 29.5255 7.45851 29.5972 5.80137 29.6689C6.891 30.9115 8.13952 31.7956 9.54695 32.5125ZM11.0906 5.63C10.6139 4.5547 10.1826 3.59889 9.75125 2.59528C8.32112 3.31214 7.0726 4.17238 6.02838 5.41494C7.66281 5.48663 9.31995 5.55831 11.0906 5.63ZM22.1911 2.18905C20.6248 1.54387 19.0812 1.08986 17.5375 1.06596C18.7179 2.33243 19.8757 3.59889 21.0788 4.88925C21.442 4.02901 21.8052 3.14487 22.1911 2.18905ZM30.8627 24.5552C29.8185 24.0534 28.9105 23.6233 27.9116 23.1454C27.9797 25.0093 28.0478 26.7536 28.1159 28.498C28.184 28.5219 28.2749 28.5458 28.343 28.5697C29.1602 27.2554 29.9774 25.9412 30.8627 24.5552ZM0.716466 18.6292C0.648365 20.039 1.28398 22.8826 1.82879 23.6711C2.64601 23.2649 3.48593 22.8826 4.30314 22.4763C3.10002 21.186 1.94229 19.9195 0.716466 18.6292ZM32.0885 16.4786C32.0431 14.8298 31.6799 13.2049 31.067 11.58C30.159 11.9862 29.3191 12.3685 28.5019 12.727C29.7277 14.0173 30.9081 15.236 32.0885 16.4786ZM4.48475 6.99205C3.39512 8.16293 2.60061 9.45329 1.98769 10.9348C2.94111 11.3649 3.82643 11.795 4.80255 12.2252C4.71175 10.4091 4.59825 8.68863 4.48475 6.99205ZM0.693765 16.4069C1.85149 15.1643 3.03191 13.9456 4.21234 12.7031C3.46322 12.3446 2.64601 11.9862 1.76069 11.58C1.17048 13.2049 0.761866 14.782 0.693765 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Pink" && "active-fancy"
                    }
                    content="Rosa"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.5454 17.6374C32.5454 27.1725 25.6628 34.3453 16.6624 34.9022C7.66197 34.3453 1.30875 27.1052 0.249878 17.6374C0.779313 8.16953 7.66197 0.929429 16.6624 0.372498C25.1333 0.929429 32.5454 8.10224 32.5454 17.6374Z"
                          fill="#FD6DB5"
                        />
                        <path
                          d="M33.0748 17.6255C33.0067 27.2554 25.6518 34.9498 16.6397 34.902C7.58219 34.8542 0.272633 27.3988 0.249933 17.6733C0.227232 8.18683 7.24169 0.420779 16.6624 0.372988C25.8334 0.301302 32.9386 8.09124 33.0748 17.6255ZM8.73991 17.6017C8.78531 17.7211 8.80801 17.8406 8.85341 17.9362C9.53443 19.6806 10.2154 21.4249 10.9192 23.1693C11.01 23.3844 11.237 23.5994 11.464 23.695C13.053 24.4119 14.6647 25.1048 16.2765 25.7978C16.4808 25.8934 16.7986 25.8934 17.0256 25.7978C18.66 25.1048 20.2718 24.388 21.8835 23.6472C22.0878 23.5516 22.3148 23.3127 22.4056 23.0737C23.0866 21.401 23.7676 19.7045 24.4259 18.0079C24.5167 17.7928 24.5167 17.4822 24.4259 17.291C23.7676 15.5466 23.0866 13.8262 22.3829 12.1057C22.2921 11.8906 22.0878 11.6756 21.8835 11.6039C20.2718 10.8631 18.66 10.1463 17.0256 9.45328C16.7986 9.3577 16.4581 9.3577 16.2311 9.45328C14.642 10.1224 13.053 10.7914 11.464 11.5322C11.2143 11.6517 10.9419 11.9145 10.8284 12.2013C10.1473 13.8501 9.53443 15.4989 8.89882 17.1715C8.83072 17.291 8.78531 17.4583 8.73991 17.6017ZM12.3947 29.0954C13.8475 30.6247 15.3004 32.1301 16.6624 33.5877C17.979 32.1779 19.341 30.7203 20.7031 29.2388C19.4772 28.498 18.1833 27.6856 16.8667 26.897C16.7305 26.8014 16.4581 26.8492 16.2992 26.9209C15.6409 27.2554 14.9825 27.6378 14.3469 27.9962C13.6659 28.3785 12.9849 28.7609 12.3947 29.0954ZM27.8991 13.3483C27.0365 14.7581 26.2193 16.0962 25.4475 17.4344C25.3794 17.5539 25.4248 17.8167 25.5156 17.9601C26.242 19.2265 26.9684 20.4691 27.6948 21.7117C27.7402 21.8073 27.831 21.879 27.9218 21.9745C29.3746 20.5169 30.8048 19.0832 32.2576 17.6017C30.7821 16.1679 29.3747 14.782 27.8991 13.3483ZM5.35754 21.9267C5.42564 21.8073 5.44834 21.7595 5.49375 21.6878C6.24286 20.4213 7.01468 19.1788 7.76379 17.9123C7.85459 17.745 7.8092 17.4105 7.69569 17.2432C7.15088 16.3113 6.58337 15.4033 6.03856 14.4713C5.81155 14.1129 5.58455 13.7545 5.33484 13.3722C3.85931 14.8298 2.45188 16.2157 0.999049 17.6494C2.45188 19.0832 3.88201 20.4691 5.35754 21.9267ZM12.4401 5.94065C13.8021 6.75309 15.096 7.54164 16.39 8.3063C16.5489 8.40188 16.8213 8.35409 17.0029 8.25851C18.1379 7.56554 19.2729 6.82478 20.408 6.10791C20.5215 6.03622 20.5896 5.94064 20.7712 5.77338C19.341 4.36354 17.9336 2.9776 16.6397 1.71114C15.3004 3.04929 13.8929 4.45913 12.4401 5.94065ZM10.6241 6.29908C8.89882 6.22739 7.15088 6.15571 5.33484 6.06012C5.44834 7.94787 5.56185 9.71613 5.69805 11.4844C7.33248 9.76392 8.96692 8.06735 10.6241 6.29908ZM27.4905 23.9818C25.9242 25.6067 24.3124 27.2793 22.6099 29.0237C23.9038 29.0237 25.1978 28.9998 26.469 29.0237C27.6721 29.0476 27.6721 29.0715 27.6494 27.8289C27.6494 27.4705 27.6494 27.1121 27.6267 26.7536C27.5813 25.7739 27.5359 24.7942 27.4905 23.9818ZM27.604 11.5322C27.604 9.71614 27.604 7.97177 27.604 6.29908C25.9469 6.29908 24.2897 6.29908 22.6326 6.29908C24.267 8.04345 25.8788 9.71614 27.604 11.5322ZM10.3062 28.7848C8.78532 27.1599 7.24168 25.4872 5.65265 23.8145C5.65265 25.4872 5.65265 27.2077 5.65265 28.9998C7.26438 28.9281 8.87612 28.8564 10.3062 28.7848ZM15.482 34.1374C14.2334 32.8231 12.9395 31.4611 11.6229 30.0751C11.237 30.9115 10.8284 31.8434 10.397 32.8231C12.0996 33.6355 13.8021 34.0657 15.482 34.1374ZM27.3089 12.9898C25.8561 12.6314 24.494 12.2969 23.0412 11.9145C23.6995 13.6111 24.3124 15.1643 24.9708 16.837C25.788 15.5227 26.5144 14.3041 27.3089 12.9898ZM10.2154 23.2649C9.55713 21.5922 8.94421 20.039 8.2859 18.3663C7.46868 19.7284 6.74227 20.947 5.94775 22.2374C7.37788 22.5958 8.73991 22.9065 10.2154 23.2649ZM12.0769 6.53803C11.7818 7.99566 11.5321 9.3816 11.2143 10.9348C12.8487 10.2179 14.3242 9.54887 15.936 8.832C14.5739 8.01956 13.3708 7.30269 12.0769 6.53803ZM24.9708 18.3902C24.3124 20.0629 23.6995 21.6161 23.0412 23.2888C24.494 22.9543 25.8334 22.6436 27.2635 22.333C26.4917 21.0187 25.7653 19.7523 24.9708 18.3902ZM21.8381 5.48663C23.6768 5.48663 25.4475 5.48663 27.1954 5.48663C26.015 4.17238 24.6529 3.19266 23.0639 2.4758C22.6326 3.5033 22.2467 4.48302 21.8381 5.48663ZM10.2154 11.9623C8.73991 12.3207 7.40059 12.6553 5.97046 13.0137C6.74227 14.328 7.46869 15.5466 8.26321 16.8848C8.92152 15.1882 9.53443 13.635 10.2154 11.9623ZM26.8322 12.1535C25.1524 10.3852 23.4725 8.61694 21.8154 6.87257C22.1105 8.16293 22.4056 9.54887 22.7234 10.9109C22.7461 11.0304 22.8596 11.1499 22.9731 11.1977C24.267 11.5083 25.561 11.8189 26.8322 12.1535ZM6.37906 12.1535C6.46986 12.1296 6.62877 12.1296 6.78767 12.0818C7.83189 11.8189 8.87612 11.5322 9.92034 11.3171C10.3516 11.2216 10.5332 11.0065 10.5787 10.6003C10.6014 10.433 10.6468 10.2896 10.6695 10.1224C10.8738 9.07096 11.0781 7.99566 11.2824 6.96815C9.64793 8.71252 8.0135 10.433 6.37906 12.1535ZM21.1798 28.737C21.4749 27.2315 21.7473 25.8695 22.0651 24.3402C20.4761 25.0571 19.0005 25.7022 17.4115 26.4191C18.7054 27.2076 19.8859 27.9484 21.1798 28.737ZM11.8272 5.1043C13.1211 3.71836 14.3469 2.40411 15.5728 1.06596C13.8929 1.18544 12.2358 1.56777 10.6241 2.30853C11.0327 3.26435 11.4186 4.17238 11.8272 5.1043ZM17.3661 8.832C18.9778 9.52497 20.4307 10.1701 22.0424 10.887C21.6792 9.3338 21.3841 7.97176 21.0436 6.51414C19.8177 7.27879 18.66 8.01956 17.3661 8.832ZM27.1727 29.8839C27.15 29.8362 27.15 29.7645 27.1273 29.7167C25.4248 29.7167 23.7222 29.7167 21.9516 29.7167C22.3829 30.7203 22.7688 31.7 23.2001 32.6797C24.6984 31.9151 26.0377 31.0787 27.1727 29.8839ZM11.1916 28.1157C10.9873 26.9448 10.7603 25.7261 10.5559 24.4836C10.4878 24.1012 10.3062 24.0056 10.0111 23.934C8.89882 23.6711 7.80919 23.3844 6.69687 23.1215C6.58337 23.0976 6.44716 23.0976 6.44716 23.0976C7.9908 24.7464 9.60253 26.4191 11.1916 28.1157ZM21.4976 30.3141C20.2491 31.6283 19.0005 32.9426 17.8428 34.1612C19.3637 34.0418 20.9982 33.6833 22.5872 32.9426C22.1786 31.9629 21.7927 31.0548 21.4976 30.3141ZM26.8095 23.241C26.8095 23.241 26.7641 23.1932 26.7414 23.1932C25.4929 23.4799 24.2443 23.7667 22.9731 24.0534C22.8823 24.0773 22.7688 24.2207 22.7461 24.3402C22.4737 25.6544 22.224 26.9687 21.9743 28.2113C23.5633 26.5625 25.1751 24.9137 26.8095 23.241ZM11.9407 28.5458C13.28 27.805 14.5058 27.1121 15.7998 26.3952C14.2334 25.7261 12.7806 25.1048 11.2143 24.4119C11.464 25.8217 11.691 27.136 11.9407 28.5458ZM31.1907 10.8631C30.2827 9.4055 29.4427 8.01956 28.6028 6.65751C28.512 6.68141 28.4212 6.7292 28.3304 6.75309C28.3304 8.54526 28.3304 10.3135 28.3304 12.1774C29.193 11.795 30.1011 11.3649 31.1907 10.8631ZM32.3257 18.8442C31.1453 20.0868 29.9422 21.3532 28.7163 22.6197C29.4881 23.002 30.3281 23.4083 31.2361 23.8384C31.849 22.1418 32.2803 20.493 32.3257 18.8442ZM4.94894 28.5458C4.94894 26.7058 4.94894 24.9137 4.94894 23.0976C4.49493 23.3127 4.04091 23.5038 3.6096 23.7189C3.1556 23.934 2.70159 24.149 2.24758 24.3641C2.67888 25.6544 4.17712 27.9962 4.94894 28.5458ZM9.78413 32.5125C10.2381 31.5088 10.6695 30.5291 11.1462 29.4538C9.35283 29.5255 7.69569 29.5972 6.03856 29.6689C7.12818 30.9115 8.3767 31.7956 9.78413 32.5125ZM11.3278 5.63C10.8511 4.5547 10.4197 3.59889 9.98844 2.59528C8.55831 3.31214 7.30978 4.17238 6.26556 5.41494C7.89999 5.48663 9.55713 5.55831 11.3278 5.63ZM22.4283 2.18905C20.862 1.54387 19.3183 1.08986 17.7747 1.06596C18.9551 2.33243 20.1129 3.59889 21.316 4.88925C21.6792 4.02901 22.0424 3.14487 22.4283 2.18905ZM31.0999 24.5552C30.0557 24.0534 29.1476 23.6233 28.1488 23.1454C28.2169 25.0093 28.285 26.7536 28.3531 28.498C28.4212 28.5219 28.512 28.5458 28.5801 28.5697C29.3974 27.2554 30.2146 25.9412 31.0999 24.5552ZM0.953649 18.6292C0.885548 20.039 1.52116 22.8826 2.06597 23.6711C2.88319 23.2649 3.72311 22.8826 4.54033 22.4763C3.3372 21.186 2.17948 19.9195 0.953649 18.6292ZM32.3257 16.4786C32.2803 14.8298 31.9171 13.2049 31.3042 11.58C30.3962 11.9862 29.5563 12.3685 28.739 12.727C29.9649 14.0173 31.1453 15.236 32.3257 16.4786ZM4.72193 6.99205C3.63231 8.16293 2.83779 9.45329 2.22488 10.9348C3.1783 11.3649 4.06361 11.795 5.03974 12.2252C4.94893 10.4091 4.83543 8.68863 4.72193 6.99205ZM0.930947 16.4069C2.08867 15.1643 3.2691 13.9456 4.44952 12.7031C3.70041 12.3446 2.88319 11.9862 1.99787 11.58C1.40766 13.2049 0.999049 14.782 0.930947 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Blue" && "active-fancy"
                    }
                    content="Azul"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.7825 17.6374C32.7825 27.1725 25.8998 34.3453 16.8994 34.9022C7.89903 34.3453 1.54581 27.1052 0.486938 17.6374C1.01637 8.16953 7.89903 0.929429 16.8994 0.372498C25.3704 0.929429 32.7825 8.10224 32.7825 17.6374Z"
                          fill="#4CC4E0"
                        />
                        <path
                          d="M33.3119 17.6255C33.2438 27.2554 25.8888 34.9498 16.8767 34.902C7.81925 34.8542 0.509694 27.3988 0.486993 17.6733C0.464293 8.18683 7.47875 0.420779 16.8994 0.372988C26.0704 0.301302 33.1757 8.09124 33.3119 17.6255ZM8.97697 17.6017C9.02237 17.7211 9.04507 17.8406 9.09047 17.9362C9.77149 19.6806 10.4525 21.4249 11.1562 23.1693C11.247 23.3844 11.474 23.5994 11.701 23.695C13.2901 24.4119 14.9018 25.1048 16.5135 25.7978C16.7178 25.8934 17.0356 25.8934 17.2626 25.7978C18.8971 25.1048 20.5088 24.388 22.1206 23.6472C22.3249 23.5516 22.5519 23.3127 22.6427 23.0737C23.3237 21.401 24.0047 19.7045 24.663 18.0079C24.7538 17.7928 24.7538 17.4822 24.663 17.291C24.0047 15.5466 23.3237 13.8262 22.62 12.1057C22.5292 11.8906 22.3249 11.6756 22.1206 11.6039C20.5088 10.8631 18.8971 10.1463 17.2626 9.45328C17.0356 9.3577 16.6951 9.3577 16.4681 9.45328C14.8791 10.1224 13.2901 10.7914 11.701 11.5322C11.4513 11.6517 11.1789 11.9145 11.0654 12.2013C10.3844 13.8501 9.77149 15.4989 9.13588 17.1715C9.06778 17.291 9.02237 17.4583 8.97697 17.6017ZM12.6318 29.0954C14.0846 30.6247 15.5374 32.1301 16.8994 33.5877C18.2161 32.1779 19.5781 30.7203 20.9401 29.2388C19.7143 28.498 18.4204 27.6856 17.1037 26.897C16.9675 26.8014 16.6951 26.8492 16.5362 26.9209C15.8779 27.2554 15.2196 27.6378 14.584 27.9962C13.903 28.3785 13.222 28.7609 12.6318 29.0954ZM28.1362 13.3483C27.2736 14.7581 26.4563 16.0962 25.6845 17.4344C25.6164 17.5539 25.6618 17.8167 25.7526 17.9601C26.479 19.2265 27.2055 20.4691 27.9319 21.7117C27.9773 21.8073 28.0681 21.879 28.1589 21.9745C29.6117 20.5169 31.0418 19.0832 32.4947 17.6017C31.0191 16.1679 29.6117 14.782 28.1362 13.3483ZM5.5946 21.9267C5.6627 21.8073 5.6854 21.7595 5.73081 21.6878C6.47992 20.4213 7.25174 19.1788 8.00085 17.9123C8.09166 17.745 8.04626 17.4105 7.93275 17.2432C7.38794 16.3113 6.82043 15.4033 6.27562 14.4713C6.04861 14.1129 5.82161 13.7545 5.5719 13.3722C4.09637 14.8298 2.68894 16.2157 1.23611 17.6494C2.68894 19.0832 4.11907 20.4691 5.5946 21.9267ZM12.6772 5.94065C14.0392 6.75309 15.3331 7.54164 16.627 8.3063C16.7859 8.40188 17.0583 8.35409 17.24 8.25851C18.375 7.56554 19.51 6.82478 20.645 6.10791C20.7585 6.03622 20.8266 5.94064 21.0082 5.77338C19.5781 4.36354 18.1707 2.9776 16.8767 1.71114C15.5374 3.04929 14.13 4.45913 12.6772 5.94065ZM10.8611 6.29908C9.13588 6.22739 7.38794 6.15571 5.5719 6.06012C5.68541 7.94787 5.79891 9.71613 5.93511 11.4844C7.56954 9.76392 9.20398 8.06735 10.8611 6.29908ZM27.7276 23.9818C26.1612 25.6067 24.5495 27.2793 22.847 29.0237C24.1409 29.0237 25.4348 28.9998 26.706 29.0237C27.9092 29.0476 27.9092 29.0715 27.8865 27.8289C27.8865 27.4705 27.8865 27.1121 27.8638 26.7536C27.8184 25.7739 27.773 24.7942 27.7276 23.9818ZM27.8411 11.5322C27.8411 9.71614 27.8411 7.97177 27.8411 6.29908C26.1839 6.29908 24.5268 6.29908 22.8697 6.29908C24.5041 8.04345 26.1158 9.71614 27.8411 11.5322ZM10.5433 28.7848C9.02238 27.1599 7.47874 25.4872 5.88971 23.8145C5.88971 25.4872 5.88971 27.2077 5.88971 28.9998C7.50144 28.9281 9.11318 28.8564 10.5433 28.7848ZM15.719 34.1374C14.4705 32.8231 13.1766 31.4611 11.8599 30.0751C11.474 30.9115 11.0654 31.8434 10.6341 32.8231C12.3366 33.6355 14.0392 34.0657 15.719 34.1374ZM27.546 12.9898C26.0931 12.6314 24.7311 12.2969 23.2783 11.9145C23.9366 13.6111 24.5495 15.1643 25.2078 16.837C26.025 15.5227 26.7515 14.3041 27.546 12.9898ZM10.4525 23.2649C9.79419 21.5922 9.18128 20.039 8.52296 18.3663C7.70574 19.7284 6.97933 20.947 6.18482 22.2374C7.61495 22.5958 8.97697 22.9065 10.4525 23.2649ZM12.3139 6.53803C12.0188 7.99566 11.7691 9.3816 11.4513 10.9348C13.0858 10.2179 14.5613 9.54887 16.173 8.832C14.811 8.01956 13.6079 7.30269 12.3139 6.53803ZM25.2078 18.3902C24.5495 20.0629 23.9366 21.6161 23.2783 23.2888C24.7311 22.9543 26.0704 22.6436 27.5006 22.333C26.7287 21.0187 26.0023 19.7523 25.2078 18.3902ZM22.0752 5.48663C23.9139 5.48663 25.6845 5.48663 27.4325 5.48663C26.252 4.17238 24.89 3.19266 23.301 2.4758C22.8697 3.5033 22.4838 4.48302 22.0752 5.48663ZM10.4525 11.9623C8.97697 12.3207 7.63765 12.6553 6.20752 13.0137C6.97933 14.328 7.70575 15.5466 8.50027 16.8848C9.15858 15.1882 9.77149 13.635 10.4525 11.9623ZM27.0693 12.1535C25.3894 10.3852 23.7096 8.61694 22.0525 6.87257C22.3476 8.16293 22.6427 9.54887 22.9605 10.9109C22.9832 11.0304 23.0967 11.1499 23.2102 11.1977C24.5041 11.5083 25.798 11.8189 27.0693 12.1535ZM6.61612 12.1535C6.70692 12.1296 6.86583 12.1296 7.02473 12.0818C8.06895 11.8189 9.11318 11.5322 10.1574 11.3171C10.5887 11.2216 10.7703 11.0065 10.8157 10.6003C10.8384 10.433 10.8838 10.2896 10.9065 10.1224C11.1108 9.07096 11.3151 7.99566 11.5194 6.96815C9.88499 8.71252 8.25056 10.433 6.61612 12.1535ZM21.4168 28.737C21.7119 27.2315 21.9844 25.8695 22.3022 24.3402C20.7131 25.0571 19.2376 25.7022 17.6486 26.4191C18.9425 27.2076 20.1229 27.9484 21.4168 28.737ZM12.0642 5.1043C13.3582 3.71836 14.584 2.40411 15.8098 1.06596C14.13 1.18544 12.4728 1.56777 10.8611 2.30853C11.2697 3.26435 11.6556 4.17238 12.0642 5.1043ZM17.6032 8.832C19.2149 9.52497 20.6677 10.1701 22.2795 10.887C21.9162 9.3338 21.6211 7.97176 21.2806 6.51414C20.0548 7.27879 18.8971 8.01956 17.6032 8.832ZM27.4098 29.8839C27.3871 29.8362 27.3871 29.7645 27.3644 29.7167C25.6618 29.7167 23.9593 29.7167 22.1887 29.7167C22.62 30.7203 23.0059 31.7 23.4372 32.6797C24.9354 31.9151 26.2747 31.0787 27.4098 29.8839ZM11.4286 28.1157C11.2243 26.9448 10.9973 25.7261 10.793 24.4836C10.7249 24.1012 10.5433 24.0056 10.2482 23.934C9.13588 23.6711 8.04626 23.3844 6.93393 23.1215C6.82043 23.0976 6.68423 23.0976 6.68423 23.0976C8.22786 24.7464 9.83959 26.4191 11.4286 28.1157ZM21.7346 30.3141C20.4861 31.6283 19.2376 32.9426 18.0799 34.1612C19.6008 34.0418 21.2352 33.6833 22.8243 32.9426C22.4157 31.9629 22.0298 31.0548 21.7346 30.3141ZM27.0466 23.241C27.0466 23.241 27.0012 23.1932 26.9785 23.1932C25.7299 23.4799 24.4814 23.7667 23.2102 24.0534C23.1194 24.0773 23.0059 24.2207 22.9832 24.3402C22.7108 25.6544 22.4611 26.9687 22.2114 28.2113C23.8004 26.5625 25.4121 24.9137 27.0466 23.241ZM12.1777 28.5458C13.5171 27.805 14.7429 27.1121 16.0368 26.3952C14.4705 25.7261 13.0177 25.1048 11.4513 24.4119C11.701 25.8217 11.928 27.136 12.1777 28.5458ZM31.4278 10.8631C30.5197 9.4055 29.6798 8.01956 28.8399 6.65751C28.7491 6.68141 28.6583 6.7292 28.5675 6.75309C28.5675 8.54526 28.5675 10.3135 28.5675 12.1774C29.4301 11.795 30.3381 11.3649 31.4278 10.8631ZM32.5628 18.8442C31.3824 20.0868 30.1792 21.3532 28.9534 22.6197C29.7252 23.002 30.5651 23.4083 31.4731 23.8384C32.0861 22.1418 32.5174 20.493 32.5628 18.8442ZM5.186 28.5458C5.186 26.7058 5.186 24.9137 5.186 23.0976C4.73199 23.3127 4.27797 23.5038 3.84667 23.7189C3.39266 23.934 2.93865 24.149 2.48464 24.3641C2.91595 25.6544 4.41418 27.9962 5.186 28.5458ZM10.0212 32.5125C10.4752 31.5088 10.9065 30.5291 11.3832 29.4538C9.58989 29.5255 7.93275 29.5972 6.27562 29.6689C7.36524 30.9115 8.61376 31.7956 10.0212 32.5125ZM11.5648 5.63C11.0881 4.5547 10.6568 3.59889 10.2255 2.59528C8.79537 3.31214 7.54684 4.17238 6.50262 5.41494C8.13705 5.48663 9.79419 5.55831 11.5648 5.63ZM22.6654 2.18905C21.099 1.54387 19.5554 1.08986 18.0118 1.06596C19.1922 2.33243 20.3499 3.59889 21.553 4.88925C21.9163 4.02901 22.2795 3.14487 22.6654 2.18905ZM31.3369 24.5552C30.2927 24.0534 29.3847 23.6233 28.3859 23.1454C28.454 25.0093 28.5221 26.7536 28.5902 28.498C28.6583 28.5219 28.7491 28.5458 28.8172 28.5697C29.6344 27.2554 30.4516 25.9412 31.3369 24.5552ZM1.19071 18.6292C1.12261 20.039 1.75822 22.8826 2.30303 23.6711C3.12025 23.2649 3.96017 22.8826 4.77739 22.4763C3.57426 21.186 2.41654 19.9195 1.19071 18.6292ZM32.5628 16.4786C32.5174 14.8298 32.1542 13.2049 31.5413 11.58C30.6332 11.9862 29.7933 12.3685 28.9761 12.727C30.2019 14.0173 31.3824 15.236 32.5628 16.4786ZM4.95899 6.99205C3.86937 8.16293 3.07485 9.45329 2.46194 10.9348C3.41536 11.3649 4.30068 11.795 5.2768 12.2252C5.18599 10.4091 5.07249 8.68863 4.95899 6.99205ZM1.16801 16.4069C2.32573 15.1643 3.50616 13.9456 4.68658 12.7031C3.93747 12.3446 3.12025 11.9862 2.23493 11.58C1.64472 13.2049 1.23611 14.782 1.16801 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Red" && "active-fancy"
                    }
                    content="Rojo"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.0197 17.6374C33.0197 27.1725 26.137 34.3453 17.1366 34.9022C8.13621 34.3453 1.78299 27.1052 0.724121 17.6374C1.25356 8.16953 8.13621 0.929429 17.1366 0.372498C25.6076 0.929429 33.0197 8.10224 33.0197 17.6374Z"
                          fill="#F03131"
                        />
                        <path
                          d="M33.549 17.6255C33.4809 27.2554 26.1259 34.9498 17.1139 34.902C8.05641 34.8542 0.746876 27.3988 0.724176 17.6733C0.701476 8.18683 7.7159 0.420779 17.1366 0.372988C26.3075 0.301302 33.4128 8.09124 33.549 17.6255ZM9.21412 17.6017C9.25952 17.7211 9.28222 17.8406 9.32762 17.9362C10.0086 19.6806 10.6896 21.4249 11.3934 23.1693C11.4842 23.3844 11.7112 23.5994 11.9382 23.695C13.5272 24.4119 15.1389 25.1048 16.7507 25.7978C16.955 25.8934 17.2728 25.8934 17.4998 25.7978C19.1342 25.1048 20.7459 24.388 22.3577 23.6472C22.562 23.5516 22.789 23.3127 22.8798 23.0737C23.5608 21.401 24.2418 19.7045 24.9001 18.0079C24.9909 17.7928 24.9909 17.4822 24.9001 17.291C24.2418 15.5466 23.5608 13.8262 22.8571 12.1057C22.7663 11.8906 22.562 11.6756 22.3577 11.6039C20.7459 10.8631 19.1342 10.1463 17.4998 9.45328C17.2728 9.3577 16.9323 9.3577 16.7053 9.45328C15.1162 10.1224 13.5272 10.7914 11.9382 11.5322C11.6885 11.6517 11.4161 11.9145 11.3026 12.2013C10.6215 13.8501 10.0086 15.4989 9.37303 17.1715C9.30493 17.291 9.25952 17.4583 9.21412 17.6017ZM12.8689 29.0954C14.3217 30.6247 15.7745 32.1301 17.1366 33.5877C18.4532 32.1779 19.8152 30.7203 21.1772 29.2388C19.9514 28.498 18.6575 27.6856 17.3409 26.897C17.2047 26.8014 16.9323 26.8492 16.7734 26.9209C16.115 27.2554 15.4567 27.6378 14.8211 27.9962C14.1401 28.3785 13.4591 28.7609 12.8689 29.0954ZM28.3733 13.3483C27.5106 14.7581 26.6934 16.0962 25.9216 17.4344C25.8535 17.5539 25.8989 17.8167 25.9897 17.9601C26.7161 19.2265 27.4425 20.4691 28.169 21.7117C28.2144 21.8073 28.3052 21.879 28.396 21.9745C29.8488 20.5169 31.2789 19.0832 32.7317 17.6017C31.2562 16.1679 29.8488 14.782 28.3733 13.3483ZM5.83177 21.9267C5.89987 21.8073 5.92257 21.7595 5.96797 21.6878C6.71708 20.4213 7.48889 19.1788 8.23801 17.9123C8.32881 17.745 8.28341 17.4105 8.16991 17.2432C7.6251 16.3113 7.05759 15.4033 6.51278 14.4713C6.28577 14.1129 6.05877 13.7545 5.80907 13.3722C4.33354 14.8298 2.92612 16.2157 1.47329 17.6494C2.92612 19.0832 4.35624 20.4691 5.83177 21.9267ZM12.9143 5.94065C14.2763 6.75309 15.5702 7.54164 16.8642 8.3063C17.0231 8.40188 17.2955 8.35409 17.4771 8.25851C18.6121 7.56554 19.7471 6.82478 20.8821 6.10791C20.9956 6.03622 21.0637 5.94064 21.2453 5.77338C19.8152 4.36354 18.4078 2.9776 17.1139 1.71114C15.7745 3.04929 14.3671 4.45913 12.9143 5.94065ZM11.0983 6.29908C9.37303 6.22739 7.6251 6.15571 5.80907 6.06012C5.92257 7.94787 6.03607 9.71613 6.17227 11.4844C7.8067 9.76392 9.44113 8.06735 11.0983 6.29908ZM27.9647 23.9818C26.3983 25.6067 24.7866 27.2793 23.0841 29.0237C24.378 29.0237 25.6719 28.9998 26.9431 29.0237C28.1463 29.0476 28.1463 29.0715 28.1236 27.8289C28.1236 27.4705 28.1236 27.1121 28.1009 26.7536C28.0555 25.7739 28.0101 24.7942 27.9647 23.9818ZM28.0782 11.5322C28.0782 9.71614 28.0782 7.97177 28.0782 6.29908C26.421 6.29908 24.7639 6.29908 23.1068 6.29908C24.7412 8.04345 26.3529 9.71614 28.0782 11.5322ZM10.7805 28.7848C9.25953 27.1599 7.7159 25.4872 6.12687 23.8145C6.12687 25.4872 6.12687 27.2077 6.12687 28.9998C7.7386 28.9281 9.35033 28.8564 10.7805 28.7848ZM15.9561 34.1374C14.7076 32.8231 13.4137 31.4611 12.0971 30.0751C11.7112 30.9115 11.3026 31.8434 10.8713 32.8231C12.5738 33.6355 14.2763 34.0657 15.9561 34.1374ZM27.7831 12.9898C26.3302 12.6314 24.9682 12.2969 23.5154 11.9145C24.1737 13.6111 24.7866 15.1643 25.4449 16.837C26.2621 15.5227 26.9885 14.3041 27.7831 12.9898ZM10.6896 23.2649C10.0313 21.5922 9.41843 20.039 8.76011 18.3663C7.9429 19.7284 7.21649 20.947 6.42198 22.2374C7.8521 22.5958 9.21412 22.9065 10.6896 23.2649ZM12.5511 6.53803C12.256 7.99566 12.0063 9.3816 11.6885 10.9348C13.3229 10.2179 14.7984 9.54887 16.4102 8.832C15.0481 8.01956 13.845 7.30269 12.5511 6.53803ZM25.4449 18.3902C24.7866 20.0629 24.1737 21.6161 23.5154 23.2888C24.9682 22.9543 26.3075 22.6436 27.7376 22.333C26.9658 21.0187 26.2394 19.7523 25.4449 18.3902ZM22.3123 5.48663C24.151 5.48663 25.9216 5.48663 27.6695 5.48663C26.4891 4.17238 25.1271 3.19266 23.5381 2.4758C23.1068 3.5033 22.7209 4.48302 22.3123 5.48663ZM10.6896 11.9623C9.21412 12.3207 7.8748 12.6553 6.44468 13.0137C7.21649 14.328 7.94291 15.5466 8.73742 16.8848C9.39573 15.1882 10.0086 13.635 10.6896 11.9623ZM27.3063 12.1535C25.6265 10.3852 23.9467 8.61694 22.2896 6.87257C22.5847 8.16293 22.8798 9.54887 23.1976 10.9109C23.2203 11.0304 23.3338 11.1499 23.4473 11.1977C24.7412 11.5083 26.0351 11.8189 27.3063 12.1535ZM6.85328 12.1535C6.94408 12.1296 7.10299 12.1296 7.26189 12.0818C8.30611 11.8189 9.35033 11.5322 10.3945 11.3171C10.8259 11.2216 11.0075 11.0065 11.0529 10.6003C11.0756 10.433 11.121 10.2896 11.1437 10.1224C11.348 9.07096 11.5523 7.99566 11.7566 6.96815C10.1221 8.71252 8.48771 10.433 6.85328 12.1535ZM21.6539 28.737C21.949 27.2315 22.2215 25.8695 22.5393 24.3402C20.9502 25.0571 19.4747 25.7022 17.8857 26.4191C19.1796 27.2076 20.36 27.9484 21.6539 28.737ZM12.3014 5.1043C13.5953 3.71836 14.8211 2.40411 16.0469 1.06596C14.3671 1.18544 12.71 1.56777 11.0983 2.30853C11.5069 3.26435 11.8928 4.17238 12.3014 5.1043ZM17.8403 8.832C19.452 9.52497 20.9048 10.1701 22.5166 10.887C22.1534 9.3338 21.8582 7.97176 21.5177 6.51414C20.2919 7.27879 19.1342 8.01956 17.8403 8.832ZM27.6468 29.8839C27.6241 29.8362 27.6241 29.7645 27.6014 29.7167C25.8989 29.7167 24.1964 29.7167 22.4258 29.7167C22.8571 30.7203 23.243 31.7 23.6743 32.6797C25.1725 31.9151 26.5118 31.0787 27.6468 29.8839ZM11.6658 28.1157C11.4615 26.9448 11.2345 25.7261 11.0302 24.4836C10.9621 24.1012 10.7805 24.0056 10.4853 23.934C9.37303 23.6711 8.28341 23.3844 7.17109 23.1215C7.05759 23.0976 6.92138 23.0976 6.92138 23.0976C8.46501 24.7464 10.0767 26.4191 11.6658 28.1157ZM21.9717 30.3141C20.7232 31.6283 19.4747 32.9426 18.317 34.1612C19.8379 34.0418 21.4723 33.6833 23.0614 32.9426C22.6528 31.9629 22.2669 31.0548 21.9717 30.3141ZM27.2836 23.241C27.2836 23.241 27.2382 23.1932 27.2155 23.1932C25.967 23.4799 24.7185 23.7667 23.4473 24.0534C23.3565 24.0773 23.243 24.2207 23.2203 24.3402C22.9479 25.6544 22.6982 26.9687 22.4485 28.2113C24.0375 26.5625 25.6492 24.9137 27.2836 23.241ZM12.4149 28.5458C13.7542 27.805 14.98 27.1121 16.2739 26.3952C14.7076 25.7261 13.2548 25.1048 11.6885 24.4119C11.9382 25.8217 12.1652 27.136 12.4149 28.5458ZM31.6648 10.8631C30.7568 9.4055 29.9169 8.01956 29.077 6.65751C28.9862 6.68141 28.8954 6.7292 28.8046 6.75309C28.8046 8.54526 28.8046 10.3135 28.8046 12.1774C29.6672 11.795 30.5752 11.3649 31.6648 10.8631ZM32.7998 18.8442C31.6194 20.0868 30.4163 21.3532 29.1905 22.6197C29.9623 23.002 30.8022 23.4083 31.7102 23.8384C32.3231 22.1418 32.7544 20.493 32.7998 18.8442ZM5.42316 28.5458C5.42316 26.7058 5.42316 24.9137 5.42316 23.0976C4.96915 23.3127 4.51514 23.5038 4.08384 23.7189C3.62983 23.934 3.17582 24.149 2.72181 24.3641C3.15312 25.6544 4.65135 27.9962 5.42316 28.5458ZM10.2583 32.5125C10.7123 31.5088 11.1437 30.5291 11.6204 29.4538C9.82703 29.5255 8.16991 29.5972 6.51278 29.6689C7.6024 30.9115 8.85092 31.7956 10.2583 32.5125ZM11.802 5.63C11.3253 4.5547 10.894 3.59889 10.4626 2.59528C9.03252 3.31214 7.784 4.17238 6.73978 5.41494C8.37421 5.48663 10.0313 5.55831 11.802 5.63ZM22.9025 2.18905C21.3361 1.54387 19.7925 1.08986 18.2489 1.06596C19.4293 2.33243 20.587 3.59889 21.7901 4.88925C22.1534 4.02901 22.5166 3.14487 22.9025 2.18905ZM31.574 24.5552C30.5298 24.0534 29.6218 23.6233 28.623 23.1454C28.6911 25.0093 28.7592 26.7536 28.8273 28.498C28.8954 28.5219 28.9862 28.5458 29.0543 28.5697C29.8715 27.2554 30.6887 25.9412 31.574 24.5552ZM1.42789 18.6292C1.35979 20.039 1.9954 22.8826 2.54021 23.6711C3.35742 23.2649 4.19734 22.8826 5.01455 22.4763C3.81143 21.186 2.65371 19.9195 1.42789 18.6292ZM32.7998 16.4786C32.7544 14.8298 32.3912 13.2049 31.7783 11.58C30.8703 11.9862 30.0304 12.3685 29.2132 12.727C30.439 14.0173 31.6194 15.236 32.7998 16.4786ZM5.19616 6.99205C4.10654 8.16293 3.31202 9.45329 2.69911 10.9348C3.65253 11.3649 4.53784 11.795 5.51396 12.2252C5.42316 10.4091 5.30966 8.68863 5.19616 6.99205ZM1.40519 16.4069C2.56291 15.1643 3.74333 13.9456 4.92375 12.7031C4.17464 12.3446 3.35742 11.9862 2.47211 11.58C1.8819 13.2049 1.47329 14.782 1.40519 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Green" && "active-fancy"
                    }
                    content="Verde"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.2567 17.6374C33.2567 27.1725 26.3741 34.3453 17.3737 34.9022C8.37327 34.3453 2.02005 27.1052 0.961182 17.6374C1.49062 8.16953 8.37327 0.929429 17.3737 0.372498C25.8446 0.929429 33.2567 8.10224 33.2567 17.6374Z"
                          fill="#7ED847"
                        />
                        <path
                          d="M33.7863 17.6255C33.7182 27.2554 26.3632 34.9498 17.351 34.902C8.29352 34.8542 0.983937 27.3988 0.961237 17.6733C0.938536 8.18683 7.95302 0.420779 17.3737 0.372988C26.5448 0.301302 33.6501 8.09124 33.7863 17.6255ZM9.45125 17.6017C9.49665 17.7211 9.51935 17.8406 9.56475 17.9362C10.2458 19.6806 10.9268 21.4249 11.6305 23.1693C11.7213 23.3844 11.9483 23.5994 12.1753 23.695C13.7644 24.4119 15.3761 25.1048 16.9878 25.7978C17.1921 25.8934 17.5099 25.8934 17.737 25.7978C19.3714 25.1048 20.9831 24.388 22.5949 23.6472C22.7992 23.5516 23.0262 23.3127 23.117 23.0737C23.798 21.401 24.479 19.7045 25.1373 18.0079C25.2281 17.7928 25.2281 17.4822 25.1373 17.291C24.479 15.5466 23.798 13.8262 23.0943 12.1057C23.0035 11.8906 22.7992 11.6756 22.5949 11.6039C20.9831 10.8631 19.3714 10.1463 17.737 9.45328C17.5099 9.3577 17.1694 9.3577 16.9424 9.45328C15.3534 10.1224 13.7644 10.7914 12.1753 11.5322C11.9256 11.6517 11.6532 11.9145 11.5397 12.2013C10.8587 13.8501 10.2458 15.4989 9.61015 17.1715C9.54205 17.291 9.49665 17.4583 9.45125 17.6017ZM13.106 29.0954C14.5589 30.6247 16.0117 32.1301 17.3737 33.5877C18.6904 32.1779 20.0524 30.7203 21.4144 29.2388C20.1886 28.498 18.8947 27.6856 17.5781 26.897C17.4418 26.8014 17.1694 26.8492 17.0105 26.9209C16.3522 27.2554 15.6939 27.6378 15.0583 27.9962C14.3773 28.3785 13.6963 28.7609 13.106 29.0954ZM28.6105 13.3483C27.7479 14.7581 26.9307 16.0962 26.1589 17.4344C26.0908 17.5539 26.1362 17.8167 26.227 17.9601C26.9534 19.2265 27.6798 20.4691 28.4062 21.7117C28.4516 21.8073 28.5424 21.879 28.6332 21.9745C30.0861 20.5169 31.5162 19.0832 32.969 17.6017C31.4935 16.1679 30.0861 14.782 28.6105 13.3483ZM6.06886 21.9267C6.13697 21.8073 6.15967 21.7595 6.20507 21.6878C6.95419 20.4213 7.72601 19.1788 8.47512 17.9123C8.56593 17.745 8.52053 17.4105 8.40703 17.2432C7.86221 16.3113 7.29469 15.4033 6.74988 14.4713C6.52287 14.1129 6.29587 13.7545 6.04616 13.3722C4.57063 14.8298 3.16319 16.2157 1.71036 17.6494C3.16319 19.0832 4.59333 20.4691 6.06886 21.9267ZM13.1514 5.94065C14.5135 6.75309 15.8074 7.54164 17.1013 8.3063C17.2602 8.40188 17.5327 8.35409 17.7143 8.25851C18.8493 7.56554 19.9843 6.82478 21.1193 6.10791C21.2328 6.03622 21.3009 5.94064 21.4825 5.77338C20.0524 4.36354 18.645 2.9776 17.351 1.71114C16.0117 3.04929 14.6043 4.45913 13.1514 5.94065ZM11.3354 6.29908C9.61015 6.22739 7.86221 6.15571 6.04616 6.06012C6.15967 7.94787 6.27317 9.71613 6.40937 11.4844C8.04381 9.76392 9.67826 8.06735 11.3354 6.29908ZM28.2019 23.9818C26.6356 25.6067 25.0238 27.2793 23.3213 29.0237C24.6152 29.0237 25.9092 28.9998 27.1804 29.0237C28.3835 29.0476 28.3835 29.0715 28.3608 27.8289C28.3608 27.4705 28.3608 27.1121 28.3381 26.7536C28.2927 25.7739 28.2473 24.7942 28.2019 23.9818ZM28.3154 11.5322C28.3154 9.71614 28.3154 7.97177 28.3154 6.29908C26.6583 6.29908 25.0011 6.29908 23.344 6.29908C24.9784 8.04345 26.5902 9.71614 28.3154 11.5322ZM11.0176 28.7848C9.49665 27.1599 7.95301 25.4872 6.36397 23.8145C6.36397 25.4872 6.36397 27.2077 6.36397 28.9998C7.97571 28.9281 9.58745 28.8564 11.0176 28.7848ZM16.1933 34.1374C14.9448 32.8231 13.6509 31.4611 12.3342 30.0751C11.9483 30.9115 11.5397 31.8434 11.1084 32.8231C12.8109 33.6355 14.5135 34.0657 16.1933 34.1374ZM28.0203 12.9898C26.5675 12.6314 25.2054 12.2969 23.7526 11.9145C24.4109 13.6111 25.0238 15.1643 25.6821 16.837C26.4994 15.5227 27.2258 14.3041 28.0203 12.9898ZM10.9268 23.2649C10.2685 21.5922 9.65555 20.039 8.99723 18.3663C8.18001 19.7284 7.4536 20.947 6.65908 22.2374C8.08922 22.5958 9.45125 22.9065 10.9268 23.2649ZM12.7882 6.53803C12.4931 7.99566 12.2434 9.3816 11.9256 10.9348C13.5601 10.2179 15.0356 9.54887 16.6473 8.832C15.2853 8.01956 14.0822 7.30269 12.7882 6.53803ZM25.6821 18.3902C25.0238 20.0629 24.4109 21.6161 23.7526 23.2888C25.2054 22.9543 26.5448 22.6436 27.9749 22.333C27.2031 21.0187 26.4767 19.7523 25.6821 18.3902ZM22.5495 5.48663C24.3882 5.48663 26.1589 5.48663 27.9068 5.48663C26.7264 4.17238 25.3643 3.19266 23.7753 2.4758C23.344 3.5033 22.9581 4.48302 22.5495 5.48663ZM10.9268 11.9623C9.45125 12.3207 8.11192 12.6553 6.68178 13.0137C7.4536 14.328 8.18002 15.5466 8.97454 16.8848C9.63286 15.1882 10.2458 13.635 10.9268 11.9623ZM27.5436 12.1535C25.8638 10.3852 24.1839 8.61694 22.5268 6.87257C22.8219 8.16293 23.117 9.54887 23.4348 10.9109C23.4575 11.0304 23.571 11.1499 23.6845 11.1977C24.9784 11.5083 26.2724 11.8189 27.5436 12.1535ZM7.09039 12.1535C7.18119 12.1296 7.3401 12.1296 7.499 12.0818C8.54323 11.8189 9.58745 11.5322 10.6317 11.3171C11.063 11.2216 11.2446 11.0065 11.29 10.6003C11.3127 10.433 11.3581 10.2896 11.3808 10.1224C11.5851 9.07096 11.7894 7.99566 11.9937 6.96815C10.3593 8.71252 8.72483 10.433 7.09039 12.1535ZM21.8912 28.737C22.1863 27.2315 22.4587 25.8695 22.7765 24.3402C21.1874 25.0571 19.7119 25.7022 18.1229 26.4191C19.4168 27.2076 20.5972 27.9484 21.8912 28.737ZM12.5385 5.1043C13.8325 3.71836 15.0583 2.40411 16.2841 1.06596C14.6043 1.18544 12.9471 1.56777 11.3354 2.30853C11.744 3.26435 12.1299 4.17238 12.5385 5.1043ZM18.0775 8.832C19.6892 9.52497 21.142 10.1701 22.7538 10.887C22.3906 9.3338 22.0955 7.97176 21.755 6.51414C20.5291 7.27879 19.3714 8.01956 18.0775 8.832ZM27.8841 29.8839C27.8614 29.8362 27.8614 29.7645 27.8387 29.7167C26.1362 29.7167 24.4336 29.7167 22.663 29.7167C23.0943 30.7203 23.4802 31.7 23.9115 32.6797C25.4097 31.9151 26.7491 31.0787 27.8841 29.8839ZM11.9029 28.1157C11.6986 26.9448 11.4716 25.7261 11.2673 24.4836C11.1992 24.1012 11.0176 24.0056 10.7225 23.934C9.61015 23.6711 8.52053 23.3844 7.4082 23.1215C7.2947 23.0976 7.15849 23.0976 7.15849 23.0976C8.70213 24.7464 10.3139 26.4191 11.9029 28.1157ZM22.209 30.3141C20.9604 31.6283 19.7119 32.9426 18.5542 34.1612C20.0751 34.0418 21.7096 33.6833 23.2986 32.9426C22.89 31.9629 22.5041 31.0548 22.209 30.3141ZM27.5209 23.241C27.5209 23.241 27.4755 23.1932 27.4528 23.1932C26.2043 23.4799 24.9557 23.7667 23.6845 24.0534C23.5937 24.0773 23.4802 24.2207 23.4575 24.3402C23.1851 25.6544 22.9354 26.9687 22.6857 28.2113C24.2747 26.5625 25.8865 24.9137 27.5209 23.241ZM12.652 28.5458C13.9914 27.805 15.2172 27.1121 16.5111 26.3952C14.9448 25.7261 13.492 25.1048 11.9256 24.4119C12.1753 25.8217 12.4023 27.136 12.652 28.5458ZM31.9021 10.8631C30.9941 9.4055 30.1542 8.01956 29.3142 6.65751C29.2234 6.68141 29.1326 6.7292 29.0418 6.75309C29.0418 8.54526 29.0418 10.3135 29.0418 12.1774C29.9045 11.795 30.8125 11.3649 31.9021 10.8631ZM33.0371 18.8442C31.8567 20.0868 30.6536 21.3532 29.4277 22.6197C30.1996 23.002 31.0395 23.4083 31.9475 23.8384C32.5604 22.1418 32.9917 20.493 33.0371 18.8442ZM5.66026 28.5458C5.66026 26.7058 5.66026 24.9137 5.66026 23.0976C5.20624 23.3127 4.75223 23.5038 4.32092 23.7189C3.86691 23.934 3.4129 24.149 2.95889 24.3641C3.3902 25.6544 4.88844 27.9962 5.66026 28.5458ZM10.4955 32.5125C10.9495 31.5088 11.3808 30.5291 11.8575 29.4538C10.0642 29.5255 8.40702 29.5972 6.74988 29.6689C7.83951 30.9115 9.08804 31.7956 10.4955 32.5125ZM12.0391 5.63C11.5624 4.5547 11.1311 3.59889 10.6998 2.59528C9.26964 3.31214 8.02111 4.17238 6.97689 5.41494C8.61133 5.48663 10.2685 5.55831 12.0391 5.63ZM23.1397 2.18905C21.5734 1.54387 20.0297 1.08986 18.4861 1.06596C19.6665 2.33243 20.8242 3.59889 22.0274 4.88925C22.3906 4.02901 22.7538 3.14487 23.1397 2.18905ZM31.8113 24.5552C30.7671 24.0534 29.8591 23.6233 28.8602 23.1454C28.9283 25.0093 28.9964 26.7536 29.0645 28.498C29.1326 28.5219 29.2234 28.5458 29.2915 28.5697C30.1088 27.2554 30.926 25.9412 31.8113 24.5552ZM1.66496 18.6292C1.59685 20.039 2.23247 22.8826 2.77728 23.6711C3.5945 23.2649 4.43443 22.8826 5.25165 22.4763C4.04852 21.186 2.89079 19.9195 1.66496 18.6292ZM33.0371 16.4786C32.9917 14.8298 32.6285 13.2049 32.0156 11.58C31.1076 11.9862 30.2677 12.3685 29.4504 12.727C30.6763 14.0173 31.8567 15.236 33.0371 16.4786ZM5.43325 6.99205C4.34362 8.16293 3.5491 9.45329 2.93619 10.9348C3.88961 11.3649 4.77493 11.795 5.75106 12.2252C5.66025 10.4091 5.54675 8.68863 5.43325 6.99205ZM1.64225 16.4069C2.79998 15.1643 3.98041 13.9456 5.16084 12.7031C4.41172 12.3446 3.5945 11.9862 2.70918 11.58C2.11897 13.2049 1.71036 14.782 1.64225 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Purple" && "active-fancy"
                    }
                    content="Púrpura"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.4939 17.6374C32.4939 27.1725 25.6112 34.3453 16.6108 34.9022C7.61036 34.3453 1.25712 27.1052 0.198242 17.6374C0.727679 8.16953 7.61036 0.929429 16.6108 0.372498C25.0818 0.929429 32.4939 8.10224 32.4939 17.6374Z"
                          fill="#922BDE"
                        />
                        <path
                          d="M33.0233 17.6255C32.9552 27.2554 25.6002 34.9498 16.5881 34.902C7.53058 34.8542 0.220998 27.3988 0.198297 17.6733C0.175597 8.18683 7.19008 0.420779 16.6108 0.372988C25.7818 0.301302 32.8871 8.09124 33.0233 17.6255ZM8.68831 17.6017C8.73371 17.7211 8.75641 17.8406 8.80181 17.9362C9.48283 19.6806 10.1638 21.4249 10.8676 23.1693C10.9584 23.3844 11.1854 23.5994 11.4124 23.695C13.0014 24.4119 14.6132 25.1048 16.2249 25.7978C16.4292 25.8934 16.747 25.8934 16.974 25.7978C18.6085 25.1048 20.2202 24.388 21.8319 23.6472C22.0362 23.5516 22.2632 23.3127 22.354 23.0737C23.0351 21.401 23.7161 19.7045 24.3744 18.0079C24.4652 17.7928 24.4652 17.4822 24.3744 17.291C23.7161 15.5466 23.0351 13.8262 22.3313 12.1057C22.2405 11.8906 22.0362 11.6756 21.8319 11.6039C20.2202 10.8631 18.6085 10.1463 16.974 9.45328C16.747 9.3577 16.4065 9.3577 16.1795 9.45328C14.5905 10.1224 13.0014 10.7914 11.4124 11.5322C11.1627 11.6517 10.8903 11.9145 10.7768 12.2013C10.0957 13.8501 9.48283 15.4989 8.84721 17.1715C8.77911 17.291 8.73371 17.4583 8.68831 17.6017ZM12.3431 29.0954C13.7959 30.6247 15.2488 32.1301 16.6108 33.5877C17.9274 32.1779 19.2895 30.7203 20.6515 29.2388C19.4257 28.498 18.1317 27.6856 16.8151 26.897C16.6789 26.8014 16.4065 26.8492 16.2476 26.9209C15.5893 27.2554 14.931 27.6378 14.2953 27.9962C13.6143 28.3785 12.9333 28.7609 12.3431 29.0954ZM27.8476 13.3483C26.985 14.7581 26.1677 16.0962 25.3959 17.4344C25.3278 17.5539 25.3732 17.8167 25.464 17.9601C26.1904 19.2265 26.9169 20.4691 27.6433 21.7117C27.6887 21.8073 27.7795 21.879 27.8703 21.9745C29.3231 20.5169 30.7533 19.0832 32.2061 17.6017C30.7306 16.1679 29.3231 14.782 27.8476 13.3483ZM5.30592 21.9267C5.37403 21.8073 5.39673 21.7595 5.44213 21.6878C6.19125 20.4213 6.96307 19.1788 7.71218 17.9123C7.80299 17.745 7.75759 17.4105 7.64409 17.2432C7.09927 16.3113 6.53175 15.4033 5.98694 14.4713C5.75994 14.1129 5.53293 13.7545 5.28323 13.3722C3.80769 14.8298 2.40025 16.2157 0.947416 17.6494C2.40025 19.0832 3.83039 20.4691 5.30592 21.9267ZM12.3885 5.94065C13.7505 6.75309 15.0445 7.54164 16.3384 8.3063C16.4973 8.40188 16.7697 8.35409 16.9513 8.25851C18.0863 7.56554 19.2214 6.82478 20.3564 6.10791C20.4699 6.03622 20.538 5.94064 20.7196 5.77338C19.2895 4.36354 17.882 2.9776 16.5881 1.71114C15.2488 3.04929 13.8413 4.45913 12.3885 5.94065ZM10.5725 6.29908C8.84721 6.22739 7.09927 6.15571 5.28323 6.06012C5.39673 7.94787 5.51023 9.71613 5.64643 11.4844C7.28087 9.76392 8.91532 8.06735 10.5725 6.29908ZM27.439 23.9818C25.8726 25.6067 24.2609 27.2793 22.5584 29.0237C23.8523 29.0237 25.1462 28.9998 26.4174 29.0237C27.6206 29.0476 27.6206 29.0715 27.5979 27.8289C27.5979 27.4705 27.5979 27.1121 27.5752 26.7536C27.5298 25.7739 27.4844 24.7942 27.439 23.9818ZM27.5525 11.5322C27.5525 9.71614 27.5525 7.97177 27.5525 6.29908C25.8953 6.29908 24.2382 6.29908 22.5811 6.29908C24.2155 8.04345 25.8272 9.71614 27.5525 11.5322ZM10.2547 28.7848C8.73371 27.1599 7.19007 25.4872 5.60103 23.8145C5.60103 25.4872 5.60103 27.2077 5.60103 28.9998C7.21277 28.9281 8.82452 28.8564 10.2547 28.7848ZM15.4304 34.1374C14.1818 32.8231 12.8879 31.4611 11.5713 30.0751C11.1854 30.9115 10.7768 31.8434 10.3455 32.8231C12.048 33.6355 13.7505 34.0657 15.4304 34.1374ZM27.2574 12.9898C25.8045 12.6314 24.4425 12.2969 22.9897 11.9145C23.648 13.6111 24.2609 15.1643 24.9192 16.837C25.7364 15.5227 26.4629 14.3041 27.2574 12.9898ZM10.1638 23.2649C9.50553 21.5922 8.89261 20.039 8.23429 18.3663C7.41707 19.7284 6.69066 20.947 5.89614 22.2374C7.32628 22.5958 8.68831 22.9065 10.1638 23.2649ZM12.0253 6.53803C11.7302 7.99566 11.4805 9.3816 11.1627 10.9348C12.7971 10.2179 14.2726 9.54887 15.8844 8.832C14.5224 8.01956 13.3192 7.30269 12.0253 6.53803ZM24.9192 18.3902C24.2609 20.0629 23.648 21.6161 22.9897 23.2888C24.4425 22.9543 25.7818 22.6436 27.212 22.333C26.4401 21.0187 25.7137 19.7523 24.9192 18.3902ZM21.7865 5.48663C23.6253 5.48663 25.3959 5.48663 27.1439 5.48663C25.9634 4.17238 24.6014 3.19266 23.0124 2.4758C22.5811 3.5033 22.1951 4.48302 21.7865 5.48663ZM10.1638 11.9623C8.68831 12.3207 7.34898 12.6553 5.91884 13.0137C6.69066 14.328 7.41708 15.5466 8.2116 16.8848C8.86992 15.1882 9.48283 13.635 10.1638 11.9623ZM26.7807 12.1535C25.1008 10.3852 23.421 8.61694 21.7638 6.87257C22.0589 8.16293 22.354 9.54887 22.6719 10.9109C22.6946 11.0304 22.8081 11.1499 22.9216 11.1977C24.2155 11.5083 25.5094 11.8189 26.7807 12.1535ZM6.32745 12.1535C6.41825 12.1296 6.57716 12.1296 6.73606 12.0818C7.78029 11.8189 8.82451 11.5322 9.86874 11.3171C10.3 11.2216 10.4817 11.0065 10.5271 10.6003C10.5498 10.433 10.5952 10.2896 10.6179 10.1224C10.8222 9.07096 11.0265 7.99566 11.2308 6.96815C9.59633 8.71252 7.96189 10.433 6.32745 12.1535ZM21.1282 28.737C21.4233 27.2315 21.6957 25.8695 22.0135 24.3402C20.4245 25.0571 18.949 25.7022 17.3599 26.4191C18.6539 27.2076 19.8343 27.9484 21.1282 28.737ZM11.7756 5.1043C13.0695 3.71836 14.2953 2.40411 15.5212 1.06596C13.8413 1.18544 12.1842 1.56777 10.5725 2.30853C10.9811 3.26435 11.367 4.17238 11.7756 5.1043ZM17.3145 8.832C18.9263 9.52497 20.3791 10.1701 21.9908 10.887C21.6276 9.3338 21.3325 7.97176 20.992 6.51414C19.7662 7.27879 18.6085 8.01956 17.3145 8.832ZM27.1212 29.8839C27.0985 29.8362 27.0985 29.7645 27.0758 29.7167C25.3732 29.7167 23.6707 29.7167 21.9 29.7167C22.3314 30.7203 22.7173 31.7 23.1486 32.6797C24.6468 31.9151 25.9861 31.0787 27.1212 29.8839ZM11.14 28.1157C10.9357 26.9448 10.7087 25.7261 10.5044 24.4836C10.4362 24.1012 10.2546 24.0056 9.95954 23.934C8.84721 23.6711 7.75759 23.3844 6.64526 23.1215C6.53176 23.0976 6.39555 23.0976 6.39555 23.0976C7.93919 24.7464 9.55093 26.4191 11.14 28.1157ZM21.446 30.3141C20.1975 31.6283 18.949 32.9426 17.7912 34.1612C19.3122 34.0418 20.9466 33.6833 22.5357 32.9426C22.127 31.9629 21.7411 31.0548 21.446 30.3141ZM26.758 23.241C26.758 23.241 26.7126 23.1932 26.6899 23.1932C25.4413 23.4799 24.1928 23.7667 22.9216 24.0534C22.8308 24.0773 22.7173 24.2207 22.6946 24.3402C22.4222 25.6544 22.1724 26.9687 21.9227 28.2113C23.5118 26.5625 25.1235 24.9137 26.758 23.241ZM11.8891 28.5458C13.2284 27.805 14.4543 27.1121 15.7482 26.3952C14.1818 25.7261 12.729 25.1048 11.1627 24.4119C11.4124 25.8217 11.6394 27.136 11.8891 28.5458ZM31.1392 10.8631C30.2311 9.4055 29.3912 8.01956 28.5513 6.65751C28.4605 6.68141 28.3697 6.7292 28.2789 6.75309C28.2789 8.54526 28.2789 10.3135 28.2789 12.1774C29.1415 11.795 30.0495 11.3649 31.1392 10.8631ZM32.2742 18.8442C31.0938 20.0868 29.8906 21.3532 28.6648 22.6197C29.4366 23.002 30.2765 23.4083 31.1846 23.8384C31.7975 22.1418 32.2288 20.493 32.2742 18.8442ZM4.89732 28.5458C4.89732 26.7058 4.89732 24.9137 4.89732 23.0976C4.44331 23.3127 3.98929 23.5038 3.55798 23.7189C3.10397 23.934 2.64996 24.149 2.19595 24.3641C2.62726 25.6544 4.1255 27.9962 4.89732 28.5458ZM9.73253 32.5125C10.1865 31.5088 10.6179 30.5291 11.0946 29.4538C9.30122 29.5255 7.64408 29.5972 5.98694 29.6689C7.07657 30.9115 8.3251 31.7956 9.73253 32.5125ZM11.2762 5.63C10.7995 4.5547 10.3681 3.59889 9.93684 2.59528C8.5067 3.31214 7.25817 4.17238 6.21395 5.41494C7.84839 5.48663 9.50553 5.55831 11.2762 5.63ZM22.3768 2.18905C20.8104 1.54387 19.2668 1.08986 17.7231 1.06596C18.9036 2.33243 20.0613 3.59889 21.2644 4.88925C21.6276 4.02901 21.9908 3.14487 22.3768 2.18905ZM31.0484 24.5552C30.0041 24.0534 29.0961 23.6233 28.0973 23.1454C28.1654 25.0093 28.2335 26.7536 28.3016 28.498C28.3697 28.5219 28.4605 28.5458 28.5286 28.5697C29.3458 27.2554 30.163 25.9412 31.0484 24.5552ZM0.902016 18.6292C0.833914 20.039 1.46953 22.8826 2.01434 23.6711C2.83156 23.2649 3.67149 22.8826 4.48871 22.4763C3.28558 21.186 2.12785 19.9195 0.902016 18.6292ZM32.2742 16.4786C32.2288 14.8298 31.8656 13.2049 31.2527 11.58C30.3447 11.9862 29.5047 12.3685 28.6875 12.727C29.9133 14.0173 31.0938 15.236 32.2742 16.4786ZM4.67031 6.99205C3.58068 8.16293 2.78616 9.45329 2.17325 10.9348C3.12667 11.3649 4.01199 11.795 4.98812 12.2252C4.89732 10.4091 4.78381 8.68863 4.67031 6.99205ZM0.879314 16.4069C2.03704 15.1643 3.21747 13.9456 4.3979 12.7031C3.64878 12.3446 2.83157 11.9862 1.94624 11.58C1.35603 13.2049 0.947416 14.782 0.879314 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Orange" && "active-fancy"
                    }
                    content="Naranja"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.7308 17.6374C32.7308 27.1725 25.8482 34.3453 16.8478 34.9022C7.84749 34.3453 1.49429 27.1052 0.435425 17.6374C0.964858 8.16953 7.84749 0.929429 16.8478 0.372498C25.3188 0.929429 32.7308 8.10224 32.7308 17.6374Z"
                          fill="#F5A72A"
                        />
                        <path
                          d="M33.2605 17.6255C33.1924 27.2554 25.8374 34.9498 16.8253 34.902C7.76777 34.8542 0.45818 27.3988 0.43548 17.6733C0.412779 8.18683 7.42726 0.420779 16.848 0.372988C26.019 0.301302 33.1243 8.09124 33.2605 17.6255ZM8.92549 17.6017C8.97089 17.7211 8.99359 17.8406 9.03899 17.9362C9.72001 19.6806 10.401 21.4249 11.1047 23.1693C11.1955 23.3844 11.4226 23.5994 11.6496 23.695C13.2386 24.4119 14.8503 25.1048 16.4621 25.7978C16.6664 25.8934 16.9842 25.8934 17.2112 25.7978C18.8456 25.1048 20.4574 24.388 22.0691 23.6472C22.2734 23.5516 22.5004 23.3127 22.5912 23.0737C23.2722 21.401 23.9533 19.7045 24.6116 18.0079C24.7024 17.7928 24.7024 17.4822 24.6116 17.291C23.9533 15.5466 23.2722 13.8262 22.5685 12.1057C22.4777 11.8906 22.2734 11.6756 22.0691 11.6039C20.4574 10.8631 18.8456 10.1463 17.2112 9.45328C16.9842 9.3577 16.6437 9.3577 16.4167 9.45328C14.8276 10.1224 13.2386 10.7914 11.6496 11.5322C11.3999 11.6517 11.1274 11.9145 11.0139 12.2013C10.3329 13.8501 9.72001 15.4989 9.0844 17.1715C9.01629 17.291 8.97089 17.4583 8.92549 17.6017ZM12.5803 29.0954C14.0331 30.6247 15.486 32.1301 16.848 33.5877C18.1646 32.1779 19.5267 30.7203 20.8887 29.2388C19.6629 28.498 18.3689 27.6856 17.0523 26.897C16.9161 26.8014 16.6437 26.8492 16.4848 26.9209C15.8265 27.2554 15.1681 27.6378 14.5325 27.9962C13.8515 28.3785 13.1705 28.7609 12.5803 29.0954ZM28.0848 13.3483C27.2222 14.7581 26.4049 16.0962 25.6331 17.4344C25.565 17.5539 25.6104 17.8167 25.7012 17.9601C26.4276 19.2265 27.154 20.4691 27.8805 21.7117C27.9259 21.8073 28.0167 21.879 28.1075 21.9745C29.5603 20.5169 30.9904 19.0832 32.4433 17.6017C30.9677 16.1679 29.5603 14.782 28.0848 13.3483ZM5.54311 21.9267C5.61121 21.8073 5.63391 21.7595 5.67931 21.6878C6.42843 20.4213 7.20025 19.1788 7.94937 17.9123C8.04017 17.745 7.99477 17.4105 7.88127 17.2432C7.33646 16.3113 6.76894 15.4033 6.22412 14.4713C5.99712 14.1129 5.77011 13.7545 5.52041 13.3722C4.04487 14.8298 2.63744 16.2157 1.1846 17.6494C2.63744 19.0832 4.06757 20.4691 5.54311 21.9267ZM12.6257 5.94065C13.9877 6.75309 15.2817 7.54164 16.5756 8.3063C16.7345 8.40188 17.0069 8.35409 17.1885 8.25851C18.3235 7.56554 19.4586 6.82478 20.5936 6.10791C20.7071 6.03622 20.7752 5.94064 20.9568 5.77338C19.5267 4.36354 18.1192 2.9776 16.8253 1.71114C15.486 3.04929 14.0785 4.45913 12.6257 5.94065ZM10.8096 6.29908C9.0844 6.22739 7.33645 6.15571 5.52041 6.06012C5.63391 7.94787 5.74741 9.71613 5.88362 11.4844C7.51806 9.76392 9.1525 8.06735 10.8096 6.29908ZM27.6762 23.9818C26.1098 25.6067 24.4981 27.2793 22.7955 29.0237C24.0895 29.0237 25.3834 28.9998 26.6546 29.0237C27.8578 29.0476 27.8578 29.0715 27.8351 27.8289C27.8351 27.4705 27.8351 27.1121 27.8124 26.7536C27.767 25.7739 27.7216 24.7942 27.6762 23.9818ZM27.7897 11.5322C27.7897 9.71614 27.7897 7.97177 27.7897 6.29908C26.1325 6.29908 24.4754 6.29908 22.8182 6.29908C24.4527 8.04345 26.0644 9.71614 27.7897 11.5322ZM10.4918 28.7848C8.9709 27.1599 7.42725 25.4872 5.83821 23.8145C5.83821 25.4872 5.83821 27.2077 5.83821 28.9998C7.44995 28.9281 9.0617 28.8564 10.4918 28.7848ZM15.6676 34.1374C14.419 32.8231 13.1251 31.4611 11.8085 30.0751C11.4226 30.9115 11.0139 31.8434 10.5826 32.8231C12.2852 33.6355 13.9877 34.0657 15.6676 34.1374ZM27.4946 12.9898C26.0417 12.6314 24.6797 12.2969 23.2268 11.9145C23.8852 13.6111 24.4981 15.1643 25.1564 16.837C25.9736 15.5227 26.7 14.3041 27.4946 12.9898ZM10.401 23.2649C9.74271 21.5922 9.12979 20.039 8.47148 18.3663C7.65426 19.7284 6.92784 20.947 6.13332 22.2374C7.56346 22.5958 8.92549 22.9065 10.401 23.2649ZM12.2625 6.53803C11.9674 7.99566 11.7177 9.3816 11.3999 10.9348C13.0343 10.2179 14.5098 9.54887 16.1216 8.832C14.7595 8.01956 13.5564 7.30269 12.2625 6.53803ZM25.1564 18.3902C24.4981 20.0629 23.8852 21.6161 23.2268 23.2888C24.6797 22.9543 26.019 22.6436 27.4492 22.333C26.6773 21.0187 25.9509 19.7523 25.1564 18.3902ZM22.0237 5.48663C23.8625 5.48663 25.6331 5.48663 27.3811 5.48663C26.2006 4.17238 24.8386 3.19266 23.2495 2.4758C22.8182 3.5033 22.4323 4.48302 22.0237 5.48663ZM10.401 11.9623C8.92549 12.3207 7.58616 12.6553 6.15602 13.0137C6.92784 14.328 7.65426 15.5466 8.44878 16.8848C9.1071 15.1882 9.72001 13.635 10.401 11.9623ZM27.0178 12.1535C25.338 10.3852 23.6582 8.61694 22.001 6.87257C22.2961 8.16293 22.5912 9.54887 22.909 10.9109C22.9317 11.0304 23.0452 11.1499 23.1587 11.1977C24.4527 11.5083 25.7466 11.8189 27.0178 12.1535ZM6.56463 12.1535C6.65543 12.1296 6.81434 12.1296 6.97324 12.0818C8.01747 11.8189 9.0617 11.5322 10.1059 11.3171C10.5372 11.2216 10.7188 11.0065 10.7642 10.6003C10.7869 10.433 10.8323 10.2896 10.855 10.1224C11.0593 9.07096 11.2636 7.99566 11.468 6.96815C9.83351 8.71252 8.19907 10.433 6.56463 12.1535ZM21.3654 28.737C21.6605 27.2315 21.9329 25.8695 22.2507 24.3402C20.6617 25.0571 19.1861 25.7022 17.5971 26.4191C18.891 27.2076 20.0715 27.9484 21.3654 28.737ZM12.0128 5.1043C13.3067 3.71836 14.5325 2.40411 15.7584 1.06596C14.0785 1.18544 12.4214 1.56777 10.8096 2.30853C11.2183 3.26435 11.6042 4.17238 12.0128 5.1043ZM17.5517 8.832C19.1634 9.52497 20.6163 10.1701 22.228 10.887C21.8648 9.3338 21.5697 7.97176 21.2292 6.51414C20.0034 7.27879 18.8456 8.01956 17.5517 8.832ZM27.3584 29.8839C27.3357 29.8362 27.3356 29.7645 27.3129 29.7167C25.6104 29.7167 23.9079 29.7167 22.1372 29.7167C22.5685 30.7203 22.9544 31.7 23.3858 32.6797C24.884 31.9151 26.2233 31.0787 27.3584 29.8839ZM11.3772 28.1157C11.1728 26.9448 10.9458 25.7261 10.7415 24.4836C10.6734 24.1012 10.4918 24.0056 10.1967 23.934C9.08439 23.6711 7.99477 23.3844 6.88244 23.1215C6.76894 23.0976 6.63273 23.0976 6.63273 23.0976C8.17637 24.7464 9.78811 26.4191 11.3772 28.1157ZM21.6832 30.3141C20.4347 31.6283 19.1861 32.9426 18.0284 34.1612C19.5494 34.0418 21.1838 33.6833 22.7728 32.9426C22.3642 31.9629 21.9783 31.0548 21.6832 30.3141ZM26.9951 23.241C26.9951 23.241 26.9497 23.1932 26.927 23.1932C25.6785 23.4799 24.43 23.7667 23.1587 24.0534C23.0679 24.0773 22.9544 24.2207 22.9317 24.3402C22.6593 25.6544 22.4096 26.9687 22.1599 28.2113C23.749 26.5625 25.3607 24.9137 26.9951 23.241ZM12.1263 28.5458C13.4656 27.805 14.6914 27.1121 15.9854 26.3952C14.419 25.7261 12.9662 25.1048 11.3999 24.4119C11.6496 25.8217 11.8766 27.136 12.1263 28.5458ZM31.3764 10.8631C30.4683 9.4055 29.6284 8.01956 28.7885 6.65751C28.6977 6.68141 28.6069 6.7292 28.5161 6.75309C28.5161 8.54526 28.5161 10.3135 28.5161 12.1774C29.3787 11.795 30.2867 11.3649 31.3764 10.8631ZM32.5114 18.8442C31.331 20.0868 30.1278 21.3532 28.902 22.6197C29.6738 23.002 30.5137 23.4083 31.4218 23.8384C32.0347 22.1418 32.466 20.493 32.5114 18.8442ZM5.1345 28.5458C5.1345 26.7058 5.1345 24.9137 5.1345 23.0976C4.68049 23.3127 4.22647 23.5038 3.79516 23.7189C3.34115 23.934 2.88714 24.149 2.43313 24.3641C2.86444 25.6544 4.36268 27.9962 5.1345 28.5458ZM9.96972 32.5125C10.4237 31.5088 10.855 30.5291 11.3317 29.4538C9.53841 29.5255 7.88127 29.5972 6.22412 29.6689C7.31375 30.9115 8.56228 31.7956 9.96972 32.5125ZM11.5134 5.63C11.0366 4.5547 10.6053 3.59889 10.174 2.59528C8.74388 3.31214 7.49536 4.17238 6.45113 5.41494C8.08557 5.48663 9.74271 5.55831 11.5134 5.63ZM22.6139 2.18905C21.0476 1.54387 19.504 1.08986 17.9603 1.06596C19.1407 2.33243 20.2985 3.59889 21.5016 4.88925C21.8648 4.02901 22.228 3.14487 22.6139 2.18905ZM31.2855 24.5552C30.2413 24.0534 29.3333 23.6233 28.3345 23.1454C28.4026 25.0093 28.4707 26.7536 28.5388 28.498C28.6069 28.5219 28.6977 28.5458 28.7658 28.5697C29.583 27.2554 30.4002 25.9412 31.2855 24.5552ZM1.1392 18.6292C1.0711 20.039 1.70671 22.8826 2.25152 23.6711C3.06875 23.2649 3.90867 22.8826 4.72589 22.4763C3.52276 21.186 2.36503 19.9195 1.1392 18.6292ZM32.5114 16.4786C32.466 14.8298 32.1028 13.2049 31.4899 11.58C30.5818 11.9862 29.7419 12.3685 28.9247 12.727C30.1505 14.0173 31.331 15.236 32.5114 16.4786ZM4.90749 6.99205C3.81787 8.16293 3.02335 9.45329 2.41043 10.9348C3.36386 11.3649 4.24918 11.795 5.2253 12.2252C5.1345 10.4091 5.021 8.68863 4.90749 6.99205ZM1.1165 16.4069C2.27423 15.1643 3.45465 13.9456 4.63508 12.7031C3.88597 12.3446 3.06875 11.9862 2.18343 11.58C1.59321 13.2049 1.1846 14.782 1.1165 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Violet" && "active-fancy"
                    }
                    content="Violeta"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.968 17.6374C32.968 27.1725 26.0854 34.3453 17.0851 34.9022C8.08476 34.3453 1.73159 27.1052 0.672729 17.6374C1.20216 8.16953 8.08476 0.929429 17.0851 0.372498C25.556 0.929429 32.968 8.10224 32.968 17.6374Z"
                          fill="#CB6DC3"
                        />
                        <path
                          d="M33.4976 17.6255C33.4295 27.2554 26.0745 34.9498 17.0625 34.902C8.00502 34.8542 0.695485 27.3988 0.672784 17.6733C0.650084 8.18683 7.66451 0.420779 17.0852 0.372988C26.2561 0.301302 33.3614 8.09124 33.4976 17.6255ZM9.16273 17.6017C9.20813 17.7211 9.23083 17.8406 9.27623 17.9362C9.95724 19.6806 10.6383 21.4249 11.342 23.1693C11.4328 23.3844 11.6598 23.5994 11.8868 23.695C13.4758 24.4119 15.0875 25.1048 16.6993 25.7978C16.9036 25.8934 17.2214 25.8934 17.4484 25.7978C19.0828 25.1048 20.6945 24.388 22.3063 23.6472C22.5106 23.5516 22.7376 23.3127 22.8284 23.0737C23.5094 21.401 24.1904 19.7045 24.8487 18.0079C24.9395 17.7928 24.9395 17.4822 24.8487 17.291C24.1904 15.5466 23.5094 13.8262 22.8057 12.1057C22.7149 11.8906 22.5106 11.6756 22.3063 11.6039C20.6945 10.8631 19.0828 10.1463 17.4484 9.45328C17.2214 9.3577 16.8809 9.3577 16.6539 9.45328C15.0648 10.1224 13.4758 10.7914 11.8868 11.5322C11.6371 11.6517 11.3647 11.9145 11.2512 12.2013C10.5702 13.8501 9.95725 15.4989 9.32164 17.1715C9.25354 17.291 9.20813 17.4583 9.16273 17.6017ZM12.8175 29.0954C14.2703 30.6247 15.7232 32.1301 17.0852 33.5877C18.4018 32.1779 19.7638 30.7203 21.1258 29.2388C19.9 28.498 18.6061 27.6856 17.2895 26.897C17.1533 26.8014 16.8809 26.8492 16.722 26.9209C16.0637 27.2554 15.4053 27.6378 14.7697 27.9962C14.0887 28.3785 13.4077 28.7609 12.8175 29.0954ZM28.3219 13.3483C27.4593 14.7581 26.642 16.0962 25.8702 17.4344C25.8021 17.5539 25.8475 17.8167 25.9383 17.9601C26.6647 19.2265 27.3911 20.4691 28.1176 21.7117C28.163 21.8073 28.2538 21.879 28.3446 21.9745C29.7974 20.5169 31.2275 19.0832 32.6803 17.6017C31.2048 16.1679 29.7974 14.782 28.3219 13.3483ZM5.78037 21.9267C5.84847 21.8073 5.87118 21.7595 5.91658 21.6878C6.66569 20.4213 7.4375 19.1788 8.18662 17.9123C8.27742 17.745 8.23202 17.4105 8.11852 17.2432C7.57371 16.3113 7.0062 15.4033 6.46139 14.4713C6.23438 14.1129 6.00738 13.7545 5.75768 13.3722C4.28215 14.8298 2.87472 16.2157 1.4219 17.6494C2.87472 19.0832 4.30485 20.4691 5.78037 21.9267ZM12.8629 5.94065C14.2249 6.75309 15.5188 7.54164 16.8128 8.3063C16.9717 8.40188 17.2441 8.35409 17.4257 8.25851C18.5607 7.56554 19.6957 6.82478 20.8307 6.10791C20.9442 6.03622 21.0123 5.94064 21.1939 5.77338C19.7638 4.36354 18.3564 2.9776 17.0625 1.71114C15.7232 3.04929 14.3157 4.45913 12.8629 5.94065ZM11.0469 6.29908C9.32164 6.22739 7.57371 6.15571 5.75768 6.06012C5.87118 7.94787 5.98468 9.71613 6.12088 11.4844C7.75531 9.76392 9.38974 8.06735 11.0469 6.29908ZM27.9133 23.9818C26.3469 25.6067 24.7352 27.2793 23.0327 29.0237C24.3266 29.0237 25.6205 28.9998 26.8917 29.0237C28.0949 29.0476 28.0949 29.0715 28.0722 27.8289C28.0722 27.4705 28.0722 27.1121 28.0495 26.7536C28.0041 25.7739 27.9587 24.7942 27.9133 23.9818ZM28.0268 11.5322C28.0268 9.71614 28.0268 7.97177 28.0268 6.29908C26.3696 6.29908 24.7125 6.29908 23.0554 6.29908C24.6898 8.04345 26.3015 9.71614 28.0268 11.5322ZM10.7291 28.7848C9.20814 27.1599 7.66451 25.4872 6.07548 23.8145C6.07548 25.4872 6.07548 27.2077 6.07548 28.9998C7.68721 28.9281 9.29894 28.8564 10.7291 28.7848ZM15.9048 34.1374C14.6562 32.8231 13.3623 31.4611 12.0457 30.0751C11.6598 30.9115 11.2512 31.8434 10.8199 32.8231C12.5224 33.6355 14.2249 34.0657 15.9048 34.1374ZM27.7317 12.9898C26.2788 12.6314 24.9168 12.2969 23.464 11.9145C24.1223 13.6111 24.7352 15.1643 25.3935 16.837C26.2107 15.5227 26.9371 14.3041 27.7317 12.9898ZM10.6383 23.2649C9.97995 21.5922 9.36703 20.039 8.70872 18.3663C7.89151 19.7284 7.1651 20.947 6.37059 22.2374C7.80071 22.5958 9.16273 22.9065 10.6383 23.2649ZM12.4997 6.53803C12.2046 7.99566 11.9549 9.3816 11.6371 10.9348C13.2715 10.2179 14.747 9.54887 16.3588 8.832C14.9967 8.01956 13.7936 7.30269 12.4997 6.53803ZM25.3935 18.3902C24.7352 20.0629 24.1223 21.6161 23.464 23.2888C24.9168 22.9543 26.2561 22.6436 27.6863 22.333C26.9144 21.0187 26.188 19.7523 25.3935 18.3902ZM22.2609 5.48663C24.0996 5.48663 25.8702 5.48663 27.6182 5.48663C26.4377 4.17238 25.0757 3.19266 23.4867 2.4758C23.0554 3.5033 22.6695 4.48302 22.2609 5.48663ZM10.6383 11.9623C9.16273 12.3207 7.82341 12.6553 6.39329 13.0137C7.1651 14.328 7.89151 15.5466 8.68603 16.8848C9.34434 15.1882 9.95724 13.635 10.6383 11.9623ZM27.2549 12.1535C25.5751 10.3852 23.8953 8.61694 22.2382 6.87257C22.5333 8.16293 22.8284 9.54887 23.1462 10.9109C23.1689 11.0304 23.2824 11.1499 23.3959 11.1977C24.6898 11.5083 25.9837 11.8189 27.2549 12.1535ZM6.80189 12.1535C6.89269 12.1296 7.0516 12.1296 7.2105 12.0818C8.25472 11.8189 9.29894 11.5322 10.3432 11.3171C10.7745 11.2216 10.9561 11.0065 11.0015 10.6003C11.0242 10.433 11.0696 10.2896 11.0923 10.1224C11.2966 9.07096 11.5009 7.99566 11.7052 6.96815C10.0707 8.71252 8.43632 10.433 6.80189 12.1535ZM21.6026 28.737C21.8977 27.2315 22.1701 25.8695 22.4879 24.3402C20.8988 25.0571 19.4233 25.7022 17.8343 26.4191C19.1282 27.2076 20.3086 27.9484 21.6026 28.737ZM12.25 5.1043C13.5439 3.71836 14.7697 2.40411 15.9956 1.06596C14.3157 1.18544 12.6586 1.56777 11.0469 2.30853C11.4555 3.26435 11.8414 4.17238 12.25 5.1043ZM17.7889 8.832C19.4006 9.52497 20.8534 10.1701 22.4652 10.887C22.102 9.3338 21.8069 7.97176 21.4663 6.51414C20.2405 7.27879 19.0828 8.01956 17.7889 8.832ZM27.5955 29.8839C27.5728 29.8362 27.5728 29.7645 27.5501 29.7167C25.8475 29.7167 24.145 29.7167 22.3744 29.7167C22.8057 30.7203 23.1916 31.7 23.6229 32.6797C25.1211 31.9151 26.4604 31.0787 27.5955 29.8839ZM11.6144 28.1157C11.4101 26.9448 11.1831 25.7261 10.9788 24.4836C10.9107 24.1012 10.7291 24.0056 10.434 23.934C9.32164 23.6711 8.23202 23.3844 7.1197 23.1215C7.0062 23.0976 6.86999 23.0976 6.86999 23.0976C8.41362 24.7464 10.0253 26.4191 11.6144 28.1157ZM21.9204 30.3141C20.6718 31.6283 19.4233 32.9426 18.2656 34.1612C19.7865 34.0418 21.4209 33.6833 23.01 32.9426C22.6014 31.9629 22.2155 31.0548 21.9204 30.3141ZM27.2322 23.241C27.2322 23.241 27.1868 23.1932 27.1642 23.1932C25.9156 23.4799 24.6671 23.7667 23.3959 24.0534C23.3051 24.0773 23.1916 24.2207 23.1689 24.3402C22.8965 25.6544 22.6468 26.9687 22.3971 28.2113C23.9861 26.5625 25.5978 24.9137 27.2322 23.241ZM12.3635 28.5458C13.7028 27.805 14.9286 27.1121 16.2226 26.3952C14.6562 25.7261 13.2034 25.1048 11.6371 24.4119C11.8868 25.8217 12.1138 27.136 12.3635 28.5458ZM31.6134 10.8631C30.7054 9.4055 29.8655 8.01956 29.0256 6.65751C28.9348 6.68141 28.844 6.7292 28.7532 6.75309C28.7532 8.54526 28.7532 10.3135 28.7532 12.1774C29.6158 11.795 30.5238 11.3649 31.6134 10.8631ZM32.7484 18.8442C31.568 20.0868 30.3649 21.3532 29.1391 22.6197C29.9109 23.002 30.7508 23.4083 31.6588 23.8384C32.2717 22.1418 32.703 20.493 32.7484 18.8442ZM5.37177 28.5458C5.37177 26.7058 5.37177 24.9137 5.37177 23.0976C4.91776 23.3127 4.46375 23.5038 4.03244 23.7189C3.57844 23.934 3.12443 24.149 2.67042 24.3641C3.10173 25.6544 4.59996 27.9962 5.37177 28.5458ZM10.207 32.5125C10.661 31.5088 11.0923 30.5291 11.569 29.4538C9.77564 29.5255 8.11851 29.5972 6.46139 29.6689C7.551 30.9115 8.79953 31.7956 10.207 32.5125ZM11.7506 5.63C11.2739 4.5547 10.8426 3.59889 10.4113 2.59528C8.98113 3.31214 7.73261 4.17238 6.68839 5.41494C8.32282 5.48663 9.97995 5.55831 11.7506 5.63ZM22.8511 2.18905C21.2847 1.54387 19.7411 1.08986 18.1975 1.06596C19.3779 2.33243 20.5356 3.59889 21.7388 4.88925C22.102 4.02901 22.4652 3.14487 22.8511 2.18905ZM31.5226 24.5552C30.4784 24.0534 29.5704 23.6233 28.5716 23.1454C28.6397 25.0093 28.7078 26.7536 28.7759 28.498C28.844 28.5219 28.9348 28.5458 29.0029 28.5697C29.8201 27.2554 30.6373 25.9412 31.5226 24.5552ZM1.3765 18.6292C1.3084 20.039 1.94401 22.8826 2.48882 23.6711C3.30603 23.2649 4.14595 22.8826 4.96316 22.4763C3.76004 21.186 2.60232 19.9195 1.3765 18.6292ZM32.7484 16.4786C32.703 14.8298 32.3398 13.2049 31.7269 11.58C30.8189 11.9862 29.979 12.3685 29.1618 12.727C30.3876 14.0173 31.568 15.236 32.7484 16.4786ZM5.14477 6.99205C4.05515 8.16293 3.26063 9.45329 2.64772 10.9348C3.60114 11.3649 4.48645 11.795 5.46257 12.2252C5.37177 10.4091 5.25827 8.68863 5.14477 6.99205ZM1.3538 16.4069C2.51152 15.1643 3.69194 13.9456 4.87236 12.7031C4.12324 12.3446 3.30603 11.9862 2.42072 11.58C1.83051 13.2049 1.4219 14.782 1.3538 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Gray" && "active-fancy"
                    }
                    content="Gris"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.2051 17.6374C33.2051 27.1725 26.3224 34.3453 17.322 34.9022C8.32164 34.3453 1.96842 27.1052 0.909546 17.6374C1.43898 8.16953 8.32164 0.929429 17.322 0.372498C25.793 0.929429 33.2051 8.10224 33.2051 17.6374Z"
                          fill="#BFBFBF"
                        />
                        <path
                          d="M33.7346 17.6255C33.6665 27.2554 26.3115 34.9498 17.2994 34.902C8.24189 34.8542 0.932301 27.3988 0.909601 17.6733C0.8869 8.18683 7.90138 0.420779 17.3221 0.372988C26.4931 0.301302 33.5984 8.09124 33.7346 17.6255ZM9.39961 17.6017C9.44501 17.7211 9.46771 17.8406 9.51311 17.9362C10.1941 19.6806 10.8751 21.4249 11.5789 23.1693C11.6697 23.3844 11.8967 23.5994 12.1237 23.695C13.7127 24.4119 15.3245 25.1048 16.9362 25.7978C17.1405 25.8934 17.4583 25.8934 17.6853 25.7978C19.3198 25.1048 20.9315 24.388 22.5432 23.6472C22.7475 23.5516 22.9746 23.3127 23.0654 23.0737C23.7464 21.401 24.4274 19.7045 25.0857 18.0079C25.1765 17.7928 25.1765 17.4822 25.0857 17.291C24.4274 15.5466 23.7464 13.8262 23.0427 12.1057C22.9518 11.8906 22.7475 11.6756 22.5432 11.6039C20.9315 10.8631 19.3198 10.1463 17.6853 9.45328C17.4583 9.3577 17.1178 9.3577 16.8908 9.45328C15.3018 10.1224 13.7127 10.7914 12.1237 11.5322C11.874 11.6517 11.6016 11.9145 11.4881 12.2013C10.807 13.8501 10.1941 15.4989 9.55852 17.1715C9.49042 17.291 9.44501 17.4583 9.39961 17.6017ZM13.0544 29.0954C14.5072 30.6247 15.9601 32.1301 17.3221 33.5877C18.6387 32.1779 20.0008 30.7203 21.3628 29.2388C20.137 28.498 18.8431 27.6856 17.5264 26.897C17.3902 26.8014 17.1178 26.8492 16.9589 26.9209C16.3006 27.2554 15.6423 27.6378 15.0067 27.9962C14.3256 28.3785 13.6446 28.7609 13.0544 29.0954ZM28.5589 13.3483C27.6963 14.7581 26.879 16.0962 26.1072 17.4344C26.0391 17.5539 26.0845 17.8167 26.1753 17.9601C26.9018 19.2265 27.6282 20.4691 28.3546 21.7117C28.4 21.8073 28.4908 21.879 28.5816 21.9745C30.0344 20.5169 31.4646 19.0832 32.9174 17.6017C31.4419 16.1679 30.0344 14.782 28.5589 13.3483ZM6.01723 21.9267C6.08533 21.8073 6.10803 21.7595 6.15343 21.6878C6.90255 20.4213 7.67437 19.1788 8.42349 17.9123C8.51429 17.745 8.46889 17.4105 8.35539 17.2432C7.81058 16.3113 7.24306 15.4033 6.69825 14.4713C6.47124 14.1129 6.24424 13.7545 5.99453 13.3722C4.51899 14.8298 3.11156 16.2157 1.65872 17.6494C3.11156 19.0832 4.54169 20.4691 6.01723 21.9267ZM13.0998 5.94065C14.4618 6.75309 15.7558 7.54164 17.0497 8.3063C17.2086 8.40188 17.481 8.35409 17.6626 8.25851C18.7977 7.56554 19.9327 6.82478 21.0677 6.10791C21.1812 6.03622 21.2493 5.94064 21.4309 5.77338C20.0008 4.36354 18.5933 2.9776 17.2994 1.71114C15.9601 3.04929 14.5526 4.45913 13.0998 5.94065ZM11.2838 6.29908C9.55852 6.22739 7.81057 6.15571 5.99453 6.06012C6.10803 7.94787 6.22153 9.71613 6.35774 11.4844C7.99218 9.76392 9.62662 8.06735 11.2838 6.29908ZM28.1503 23.9818C26.5839 25.6067 24.9722 27.2793 23.2697 29.0237C24.5636 29.0237 25.8575 28.9998 27.1288 29.0237C28.3319 29.0476 28.3319 29.0715 28.3092 27.8289C28.3092 27.4705 28.3092 27.1121 28.2865 26.7536C28.2411 25.7739 28.1957 24.7942 28.1503 23.9818ZM28.2638 11.5322C28.2638 9.71614 28.2638 7.97177 28.2638 6.29908C26.6066 6.29908 24.9495 6.29908 23.2924 6.29908C24.9268 8.04345 26.5385 9.71614 28.2638 11.5322ZM10.966 28.7848C9.44502 27.1599 7.90138 25.4872 6.31234 23.8145C6.31234 25.4872 6.31234 27.2077 6.31234 28.9998C7.92408 28.9281 9.53582 28.8564 10.966 28.7848ZM16.1417 34.1374C14.8932 32.8231 13.5992 31.4611 12.2826 30.0751C11.8967 30.9115 11.4881 31.8434 11.0568 32.8231C12.7593 33.6355 14.4618 34.0657 16.1417 34.1374ZM27.9687 12.9898C26.5158 12.6314 25.1538 12.2969 23.701 11.9145C24.3593 13.6111 24.9722 15.1643 25.6305 16.837C26.4477 15.5227 27.1742 14.3041 27.9687 12.9898ZM10.8751 23.2649C10.2168 21.5922 9.60392 20.039 8.9456 18.3663C8.12838 19.7284 7.40196 20.947 6.60744 22.2374C8.03758 22.5958 9.39961 22.9065 10.8751 23.2649ZM12.7366 6.53803C12.4415 7.99566 12.1918 9.3816 11.874 10.9348C13.5084 10.2179 14.984 9.54887 16.5957 8.832C15.2337 8.01956 14.0305 7.30269 12.7366 6.53803ZM25.6305 18.3902C24.9722 20.0629 24.3593 21.6161 23.701 23.2888C25.1538 22.9543 26.4931 22.6436 27.9233 22.333C27.1515 21.0187 26.425 19.7523 25.6305 18.3902ZM22.4978 5.48663C24.3366 5.48663 26.1072 5.48663 27.8552 5.48663C26.6747 4.17238 25.3127 3.19266 23.7237 2.4758C23.2924 3.5033 22.9065 4.48302 22.4978 5.48663ZM10.8751 11.9623C9.39961 12.3207 8.06028 12.6553 6.63015 13.0137C7.40197 14.328 8.12838 15.5466 8.9229 16.8848C9.58122 15.1882 10.1941 13.635 10.8751 11.9623ZM27.492 12.1535C25.8121 10.3852 24.1323 8.61694 22.4751 6.87257C22.7702 8.16293 23.0654 9.54887 23.3832 10.9109C23.4059 11.0304 23.5194 11.1499 23.6329 11.1977C24.9268 11.5083 26.2207 11.8189 27.492 12.1535ZM7.03875 12.1535C7.12956 12.1296 7.28846 12.1296 7.44736 12.0818C8.49159 11.8189 9.53582 11.5322 10.58 11.3171C11.0114 11.2216 11.193 11.0065 11.2384 10.6003C11.2611 10.433 11.3065 10.2896 11.3292 10.1224C11.5335 9.07096 11.7378 7.99566 11.9421 6.96815C10.3076 8.71252 8.67319 10.433 7.03875 12.1535ZM21.8395 28.737C22.1346 27.2315 22.407 25.8695 22.7248 24.3402C21.1358 25.0571 19.6603 25.7022 18.0712 26.4191C19.3652 27.2076 20.5456 27.9484 21.8395 28.737ZM12.4869 5.1043C13.7808 3.71836 15.0067 2.40411 16.2325 1.06596C14.5526 1.18544 12.8955 1.56777 11.2838 2.30853C11.6924 3.26435 12.0783 4.17238 12.4869 5.1043ZM18.0258 8.832C19.6376 9.52497 21.0904 10.1701 22.7021 10.887C22.3389 9.3338 22.0438 7.97176 21.7033 6.51414C20.4775 7.27879 19.3198 8.01956 18.0258 8.832ZM27.8325 29.8839C27.8098 29.8362 27.8098 29.7645 27.7871 29.7167C26.0845 29.7167 24.382 29.7167 22.6113 29.7167C23.0427 30.7203 23.4286 31.7 23.8599 32.6797C25.3581 31.9151 26.6974 31.0787 27.8325 29.8839ZM11.8513 28.1157C11.647 26.9448 11.42 25.7261 11.2157 24.4836C11.1476 24.1012 10.966 24.0056 10.6708 23.934C9.55852 23.6711 8.46889 23.3844 7.35656 23.1215C7.24306 23.0976 7.10686 23.0976 7.10686 23.0976C8.65049 24.7464 10.2622 26.4191 11.8513 28.1157ZM22.1573 30.3141C20.9088 31.6283 19.6603 32.9426 18.5025 34.1612C20.0235 34.0418 21.6579 33.6833 23.247 32.9426C22.8383 31.9629 22.4524 31.0548 22.1573 30.3141ZM27.4693 23.241C27.4693 23.241 27.4239 23.1932 27.4012 23.1932C26.1526 23.4799 24.9041 23.7667 23.6329 24.0534C23.5421 24.0773 23.4286 24.2207 23.4059 24.3402C23.1335 25.6544 22.8838 26.9687 22.634 28.2113C24.2231 26.5625 25.8348 24.9137 27.4693 23.241ZM12.6004 28.5458C13.9397 27.805 15.1656 27.1121 16.4595 26.3952C14.8931 25.7261 13.4403 25.1048 11.874 24.4119C12.1237 25.8217 12.3507 27.136 12.6004 28.5458ZM31.8505 10.8631C30.9425 9.4055 30.1025 8.01956 29.2626 6.65751C29.1718 6.68141 29.081 6.7292 28.9902 6.75309C28.9902 8.54526 28.9902 10.3135 28.9902 12.1774C29.8528 11.795 30.7608 11.3649 31.8505 10.8631ZM32.9855 18.8442C31.8051 20.0868 30.6019 21.3532 29.3761 22.6197C30.1479 23.002 30.9879 23.4083 31.8959 23.8384C32.5088 22.1418 32.9401 20.493 32.9855 18.8442ZM5.60862 28.5458C5.60862 26.7058 5.60862 24.9137 5.60862 23.0976C5.15461 23.3127 4.7006 23.5038 4.26929 23.7189C3.81527 23.934 3.36126 24.149 2.90725 24.3641C3.33856 25.6544 4.8368 27.9962 5.60862 28.5458ZM10.4438 32.5125C10.8978 31.5088 11.3292 30.5291 11.8059 29.4538C10.0125 29.5255 8.35539 29.5972 6.69825 29.6689C7.78787 30.9115 9.0364 31.7956 10.4438 32.5125ZM11.9875 5.63C11.5108 4.5547 11.0795 3.59889 10.6481 2.59528C9.21801 3.31214 7.96948 4.17238 6.92525 5.41494C8.55969 5.48663 10.2168 5.55831 11.9875 5.63ZM23.0881 2.18905C21.5217 1.54387 19.9781 1.08986 18.4344 1.06596C19.6149 2.33243 20.7726 3.59889 21.9757 4.88925C22.3389 4.02901 22.7021 3.14487 23.0881 2.18905ZM31.7597 24.5552C30.7154 24.0534 29.8074 23.6233 28.8086 23.1454C28.8767 25.0093 28.9448 26.7536 29.0129 28.498C29.081 28.5219 29.1718 28.5458 29.2399 28.5697C30.0571 27.2554 30.8743 25.9412 31.7597 24.5552ZM1.61332 18.6292C1.54522 20.039 2.18083 22.8826 2.72565 23.6711C3.54287 23.2649 4.38279 22.8826 5.20001 22.4763C3.99688 21.186 2.83915 19.9195 1.61332 18.6292ZM32.9855 16.4786C32.9401 14.8298 32.5769 13.2049 31.964 11.58C31.056 11.9862 30.216 12.3685 29.3988 12.727C30.6246 14.0173 31.8051 15.236 32.9855 16.4786ZM5.38161 6.99205C4.29199 8.16293 3.49747 9.45329 2.88455 10.9348C3.83798 11.3649 4.7233 11.795 5.69942 12.2252C5.60862 10.4091 5.49512 8.68863 5.38161 6.99205ZM1.59062 16.4069C2.74835 15.1643 3.92878 13.9456 5.10921 12.7031C4.36009 12.3446 3.54287 11.9862 2.65755 11.58C2.06733 13.2049 1.65872 14.782 1.59062 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Black" && "active-fancy"
                    }
                    content="Negro"
                  >
                    <span>
                      <svg
                        width="33"
                        height="35"
                        viewBox="0 0 33 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.4423 17.6374C32.4423 27.1725 25.5596 34.3453 16.5593 34.9022C7.55891 34.3453 1.20572 27.1052 0.146851 17.6374C0.676284 8.16953 7.55891 0.929429 16.5593 0.372498C25.0302 0.929429 32.4423 8.10224 32.4423 17.6374Z"
                          fill="black"
                        />
                        <path
                          d="M32.972 17.6255C32.9039 27.2554 25.5489 34.9498 16.5368 34.902C7.47922 34.8542 0.169606 27.3988 0.146906 17.6733C0.124205 8.18683 7.13871 0.420779 16.5595 0.372988C25.7305 0.301302 32.8358 8.09124 32.972 17.6255ZM8.63695 17.6017C8.68235 17.7211 8.70505 17.8406 8.75045 17.9362C9.43147 19.6806 10.1125 21.4249 10.8162 23.1693C10.907 23.3844 11.134 23.5994 11.361 23.695C12.9501 24.4119 14.5618 25.1048 16.1736 25.7978C16.3779 25.8934 16.6957 25.8934 16.9227 25.7978C18.5571 25.1048 20.1689 24.388 21.7806 23.6472C21.9849 23.5516 22.2119 23.3127 22.3027 23.0737C22.9838 21.401 23.6648 19.7045 24.3231 18.0079C24.4139 17.7928 24.4139 17.4822 24.3231 17.291C23.6648 15.5466 22.9838 13.8262 22.28 12.1057C22.1892 11.8906 21.9849 11.6756 21.7806 11.6039C20.1689 10.8631 18.5571 10.1463 16.9227 9.45328C16.6957 9.3577 16.3552 9.3577 16.1282 9.45328C14.5391 10.1224 12.9501 10.7914 11.361 11.5322C11.1113 11.6517 10.8389 11.9145 10.7254 12.2013C10.0444 13.8501 9.43147 15.4989 8.79585 17.1715C8.72775 17.291 8.68235 17.4583 8.63695 17.6017ZM12.2918 29.0954C13.7446 30.6247 15.1974 32.1301 16.5595 33.5877C17.8761 32.1779 19.2382 30.7203 20.6002 29.2388C19.3744 28.498 18.0804 27.6856 16.7638 26.897C16.6276 26.8014 16.3552 26.8492 16.1963 26.9209C15.5379 27.2554 14.8796 27.6378 14.244 27.9962C13.563 28.3785 12.882 28.7609 12.2918 29.0954ZM27.7963 13.3483C26.9337 14.7581 26.1164 16.0962 25.3446 17.4344C25.2765 17.5539 25.3219 17.8167 25.4127 17.9601C26.1392 19.2265 26.8656 20.4691 27.592 21.7117C27.6374 21.8073 27.7282 21.879 27.819 21.9745C29.2718 20.5169 30.702 19.0832 32.1548 17.6017C30.6793 16.1679 29.2718 14.782 27.7963 13.3483ZM5.25455 21.9267C5.32265 21.8073 5.34536 21.7595 5.39076 21.6878C6.13988 20.4213 6.9117 19.1788 7.66082 17.9123C7.75162 17.745 7.70623 17.4105 7.59272 17.2432C7.04791 16.3113 6.48039 15.4033 5.93557 14.4713C5.70856 14.1129 5.48156 13.7545 5.23185 13.3722C3.75631 14.8298 2.34887 16.2157 0.896028 17.6494C2.34887 19.0832 3.77901 20.4691 5.25455 21.9267ZM12.3372 5.94065C13.6992 6.75309 14.9931 7.54164 16.2871 8.3063C16.446 8.40188 16.7184 8.35409 16.9 8.25851C18.035 7.56554 19.1701 6.82478 20.3051 6.10791C20.4186 6.03622 20.4867 5.94064 20.6683 5.77338C19.2382 4.36354 17.8307 2.9776 16.5368 1.71114C15.1974 3.04929 13.79 4.45913 12.3372 5.94065ZM10.5211 6.29908C8.79586 6.22739 7.0479 6.15571 5.23185 6.06012C5.34536 7.94787 5.45886 9.71613 5.59506 11.4844C7.22951 9.76392 8.86396 8.06735 10.5211 6.29908ZM27.3877 23.9818C25.8213 25.6067 24.2096 27.2793 22.507 29.0237C23.801 29.0237 25.0949 28.9998 26.3662 29.0237C27.5693 29.0476 27.5693 29.0715 27.5466 27.8289C27.5466 27.4705 27.5466 27.1121 27.5239 26.7536C27.4785 25.7739 27.4331 24.7942 27.3877 23.9818ZM27.5012 11.5322C27.5012 9.71614 27.5012 7.97177 27.5012 6.29908C25.844 6.29908 24.1869 6.29908 22.5297 6.29908C24.1642 8.04345 25.7759 9.71614 27.5012 11.5322ZM10.2033 28.7848C8.68235 27.1599 7.13871 25.4872 5.54966 23.8145C5.54966 25.4872 5.54966 27.2077 5.54966 28.9998C7.16141 28.9281 8.77316 28.8564 10.2033 28.7848ZM15.379 34.1374C14.1305 32.8231 12.8366 31.4611 11.5199 30.0751C11.134 30.9115 10.7254 31.8434 10.2941 32.8231C11.9966 33.6355 13.6992 34.0657 15.379 34.1374ZM27.2061 12.9898C25.7532 12.6314 24.3912 12.2969 22.9384 11.9145C23.5967 13.6111 24.2096 15.1643 24.8679 16.837C25.6851 15.5227 26.4116 14.3041 27.2061 12.9898ZM10.1125 23.2649C9.45417 21.5922 8.84125 20.039 8.18293 18.3663C7.36571 19.7284 6.63929 20.947 5.84477 22.2374C7.27491 22.5958 8.63695 22.9065 10.1125 23.2649ZM11.9739 6.53803C11.6788 7.99566 11.4291 9.3816 11.1113 10.9348C12.7458 10.2179 14.2213 9.54887 15.8331 8.832C14.471 8.01956 13.2679 7.30269 11.9739 6.53803ZM24.8679 18.3902C24.2096 20.0629 23.5967 21.6161 22.9384 23.2888C24.3912 22.9543 25.7305 22.6436 27.1607 22.333C26.3889 21.0187 25.6624 19.7523 24.8679 18.3902ZM21.7352 5.48663C23.574 5.48663 25.3446 5.48663 27.0926 5.48663C25.9121 4.17238 24.5501 3.19266 22.9611 2.4758C22.5297 3.5033 22.1438 4.48302 21.7352 5.48663ZM10.1125 11.9623C8.63695 12.3207 7.29761 12.6553 5.86747 13.0137C6.63929 14.328 7.36572 15.5466 8.16024 16.8848C8.81856 15.1882 9.43147 13.635 10.1125 11.9623ZM26.7294 12.1535C25.0495 10.3852 23.3697 8.61694 21.7125 6.87257C22.0076 8.16293 22.3027 9.54887 22.6205 10.9109C22.6432 11.0304 22.7568 11.1499 22.8703 11.1977C24.1642 11.5083 25.4581 11.8189 26.7294 12.1535ZM6.27608 12.1535C6.36688 12.1296 6.52579 12.1296 6.68469 12.0818C7.72892 11.8189 8.77315 11.5322 9.81738 11.3171C10.2487 11.2216 10.4303 11.0065 10.4757 10.6003C10.4984 10.433 10.5438 10.2896 10.5665 10.1224C10.7708 9.07096 10.9751 7.99566 11.1794 6.96815C9.54498 8.71252 7.91053 10.433 6.27608 12.1535ZM21.0769 28.737C21.372 27.2315 21.6444 25.8695 21.9622 24.3402C20.3732 25.0571 18.8976 25.7022 17.3086 26.4191C18.6025 27.2076 19.783 27.9484 21.0769 28.737ZM11.7242 5.1043C13.0182 3.71836 14.244 2.40411 15.4698 1.06596C13.79 1.18544 12.1329 1.56777 10.5211 2.30853C10.9297 3.26435 11.3156 4.17238 11.7242 5.1043ZM17.2632 8.832C18.8749 9.52497 20.3278 10.1701 21.9395 10.887C21.5763 9.3338 21.2812 7.97176 20.9407 6.51414C19.7149 7.27879 18.5571 8.01956 17.2632 8.832ZM27.0699 29.8839C27.0472 29.8362 27.0472 29.7645 27.0245 29.7167C25.3219 29.7167 23.6194 29.7167 21.8487 29.7167C22.28 30.7203 22.666 31.7 23.0973 32.6797C24.5955 31.9151 25.9348 31.0787 27.0699 29.8839ZM11.0886 28.1157C10.8843 26.9448 10.6573 25.7261 10.453 24.4836C10.3849 24.1012 10.2033 24.0056 9.90818 23.934C8.79585 23.6711 7.70622 23.3844 6.59389 23.1215C6.48039 23.0976 6.34418 23.0976 6.34418 23.0976C7.88783 24.7464 9.49958 26.4191 11.0886 28.1157ZM21.3947 30.3141C20.1462 31.6283 18.8976 32.9426 17.7399 34.1612C19.2609 34.0418 20.8953 33.6833 22.4843 32.9426C22.0757 31.9629 21.6898 31.0548 21.3947 30.3141ZM26.7067 23.241C26.7067 23.241 26.6613 23.1932 26.6386 23.1932C25.39 23.4799 24.1415 23.7667 22.8703 24.0534C22.7795 24.0773 22.666 24.2207 22.6433 24.3402C22.3708 25.6544 22.1211 26.9687 21.8714 28.2113C23.4605 26.5625 25.0722 24.9137 26.7067 23.241ZM11.8377 28.5458C13.1771 27.805 14.4029 27.1121 15.6969 26.3952C14.1305 25.7261 12.6777 25.1048 11.1113 24.4119C11.361 25.8217 11.588 27.136 11.8377 28.5458ZM31.0879 10.8631C30.1799 9.4055 29.3399 8.01956 28.5 6.65751C28.4092 6.68141 28.3184 6.7292 28.2276 6.75309C28.2276 8.54526 28.2276 10.3135 28.2276 12.1774C29.0902 11.795 29.9983 11.3649 31.0879 10.8631ZM32.2229 18.8442C31.0425 20.0868 29.8394 21.3532 28.6135 22.6197C29.3853 23.002 30.2253 23.4083 31.1333 23.8384C31.7462 22.1418 32.1775 20.493 32.2229 18.8442ZM4.84594 28.5458C4.84594 26.7058 4.84594 24.9137 4.84594 23.0976C4.39193 23.3127 3.93791 23.5038 3.5066 23.7189C3.05259 23.934 2.59858 24.149 2.14456 24.3641C2.57588 25.6544 4.07412 27.9962 4.84594 28.5458ZM9.68118 32.5125C10.1352 31.5088 10.5665 30.5291 11.0432 29.4538C9.24987 29.5255 7.59272 29.5972 5.93557 29.6689C7.0252 30.9115 8.27374 31.7956 9.68118 32.5125ZM11.2248 5.63C10.7481 4.5547 10.3168 3.59889 9.88548 2.59528C8.45534 3.31214 7.20681 4.17238 6.16258 5.41494C7.79702 5.48663 9.45418 5.55831 11.2248 5.63ZM22.3254 2.18905C20.7591 1.54387 19.2155 1.08986 17.6718 1.06596C18.8522 2.33243 20.01 3.59889 21.2131 4.88925C21.5763 4.02901 21.9395 3.14487 22.3254 2.18905ZM30.9971 24.5552C29.9529 24.0534 29.0448 23.6233 28.046 23.1454C28.1141 25.0093 28.1822 26.7536 28.2503 28.498C28.3184 28.5219 28.4092 28.5458 28.4773 28.5697C29.2945 27.2554 30.1118 25.9412 30.9971 24.5552ZM0.850627 18.6292C0.782525 20.039 1.41814 22.8826 1.96296 23.6711C2.78018 23.2649 3.62011 22.8826 4.43733 22.4763C3.2342 21.186 2.07646 19.9195 0.850627 18.6292ZM32.2229 16.4786C32.1775 14.8298 31.8143 13.2049 31.2014 11.58C30.2934 11.9862 29.4534 12.3685 28.6362 12.727C29.8621 14.0173 31.0425 15.236 32.2229 16.4786ZM4.61894 6.99205C3.5293 8.16293 2.73478 9.45329 2.12186 10.9348C3.07529 11.3649 3.96062 11.795 4.93674 12.2252C4.84594 10.4091 4.73244 8.68863 4.61894 6.99205ZM0.827925 16.4069C1.98566 15.1643 3.16609 13.9456 4.34653 12.7031C3.5974 12.3446 2.78018 11.9862 1.89486 11.58C1.30464 13.2049 0.896027 14.782 0.827925 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Brown" && "active-fancy"
                    }
                    content="Marrón"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.6792 17.6374C32.6792 27.1725 25.7966 34.3453 16.7962 34.9022C7.79585 34.3453 1.44265 27.1052 0.383789 17.6374C0.913222 8.16953 7.79585 0.929429 16.7962 0.372498C25.2671 0.929429 32.6792 8.10224 32.6792 17.6374Z"
                          fill="#3C2706"
                        />
                        <path
                          d="M33.2089 17.6255C33.1408 27.2554 25.7858 34.9498 16.7737 34.902C7.71613 34.8542 0.406545 27.3988 0.383844 17.6733C0.361143 8.18683 7.37562 0.420779 16.7964 0.372988C25.9674 0.301302 33.0727 8.09124 33.2089 17.6255ZM8.87385 17.6017C8.91925 17.7211 8.94195 17.8406 8.98736 17.9362C9.66837 19.6806 10.3494 21.4249 11.0531 23.1693C11.1439 23.3844 11.3709 23.5994 11.5979 23.695C13.187 24.4119 14.7987 25.1048 16.4104 25.7978C16.6147 25.8934 16.9326 25.8934 17.1596 25.7978C18.794 25.1048 20.4057 24.388 22.0175 23.6472C22.2218 23.5516 22.4488 23.3127 22.5396 23.0737C23.2206 21.401 23.9016 19.7045 24.5599 18.0079C24.6507 17.7928 24.6507 17.4822 24.5599 17.291C23.9016 15.5466 23.2206 13.8262 22.5169 12.1057C22.4261 11.8906 22.2218 11.6756 22.0175 11.6039C20.4057 10.8631 18.794 10.1463 17.1596 9.45328C16.9326 9.3577 16.592 9.3577 16.365 9.45328C14.776 10.1224 13.187 10.7914 11.5979 11.5322C11.3482 11.6517 11.0758 11.9145 10.9623 12.2013C10.2813 13.8501 9.66838 15.4989 9.03276 17.1715C8.96466 17.291 8.91925 17.4583 8.87385 17.6017ZM12.5286 29.0954C13.9815 30.6247 15.4343 32.1301 16.7964 33.5877C18.113 32.1779 19.475 30.7203 20.8371 29.2388C19.6112 28.498 18.3173 27.6856 17.0007 26.897C16.8645 26.8014 16.5921 26.8492 16.4331 26.9209C15.7748 27.2554 15.1165 27.6378 14.4809 27.9962C13.7999 28.3785 13.1189 28.7609 12.5286 29.0954ZM28.0331 13.3483C27.1705 14.7581 26.3533 16.0962 25.5815 17.4344C25.5134 17.5539 25.5588 17.8167 25.6496 17.9601C26.376 19.2265 27.1024 20.4691 27.8288 21.7117C27.8742 21.8073 27.965 21.879 28.0558 21.9745C29.5087 20.5169 30.9388 19.0832 32.3916 17.6017C30.9161 16.1679 29.5087 14.782 28.0331 13.3483ZM5.49147 21.9267C5.55957 21.8073 5.58227 21.7595 5.62768 21.6878C6.37679 20.4213 7.14861 19.1788 7.89773 17.9123C7.98853 17.745 7.94314 17.4105 7.82963 17.2432C7.28482 16.3113 6.7173 15.4033 6.17249 14.4713C5.94548 14.1129 5.71848 13.7545 5.46877 13.3722C3.99324 14.8298 2.5858 16.2157 1.13296 17.6494C2.5858 19.0832 4.01593 20.4691 5.49147 21.9267ZM12.574 5.94065C13.9361 6.75309 15.23 7.54164 16.5239 8.3063C16.6829 8.40188 16.9553 8.35409 17.1369 8.25851C18.2719 7.56554 19.4069 6.82478 20.542 6.10791C20.6555 6.03622 20.7235 5.94064 20.9052 5.77338C19.475 4.36354 18.0676 2.9776 16.7737 1.71114C15.4343 3.04929 14.0269 4.45913 12.574 5.94065ZM10.758 6.29908C9.03276 6.22739 7.28482 6.15571 5.46877 6.06012C5.58228 7.94787 5.69578 9.71613 5.83198 11.4844C7.46642 9.76392 9.10086 8.06735 10.758 6.29908ZM27.6245 23.9818C26.0582 25.6067 24.4464 27.2793 22.7439 29.0237C24.0378 29.0237 25.3318 28.9998 26.603 29.0237C27.8061 29.0476 27.8061 29.0715 27.7834 27.8289C27.7834 27.4705 27.7834 27.1121 27.7607 26.7536C27.7153 25.7739 27.6699 24.7942 27.6245 23.9818ZM27.738 11.5322C27.738 9.71614 27.738 7.97177 27.738 6.29908C26.0809 6.29908 24.4237 6.29908 22.7666 6.29908C24.401 8.04345 26.0128 9.71614 27.738 11.5322ZM10.4402 28.7848C8.91926 27.1599 7.37562 25.4872 5.78658 23.8145C5.78658 25.4872 5.78658 27.2077 5.78658 28.9998C7.39832 28.9281 9.01006 28.8564 10.4402 28.7848ZM15.6159 34.1374C14.3674 32.8231 13.0735 31.4611 11.7568 30.0751C11.3709 30.9115 10.9623 31.8434 10.531 32.8231C12.2335 33.6355 13.9361 34.0657 15.6159 34.1374ZM27.4429 12.9898C25.9901 12.6314 24.628 12.2969 23.1752 11.9145C23.8335 13.6111 24.4464 15.1643 25.1048 16.837C25.922 15.5227 26.6484 14.3041 27.4429 12.9898ZM10.3494 23.2649C9.69107 21.5922 9.07816 20.039 8.41984 18.3663C7.60262 19.7284 6.87621 20.947 6.08169 22.2374C7.51182 22.5958 8.87385 22.9065 10.3494 23.2649ZM12.2108 6.53803C11.9157 7.99566 11.666 9.3816 11.3482 10.9348C12.9827 10.2179 14.4582 9.54887 16.0699 8.832C14.7079 8.01956 13.5048 7.30269 12.2108 6.53803ZM25.1048 18.3902C24.4464 20.0629 23.8335 21.6161 23.1752 23.2888C24.628 22.9543 25.9674 22.6436 27.3975 22.333C26.6257 21.0187 25.8993 19.7523 25.1048 18.3902ZM21.9721 5.48663C23.8108 5.48663 25.5815 5.48663 27.3294 5.48663C26.149 4.17238 24.787 3.19266 23.1979 2.4758C22.7666 3.5033 22.3807 4.48302 21.9721 5.48663ZM10.3494 11.9623C8.87385 12.3207 7.53452 12.6553 6.10439 13.0137C6.87621 14.328 7.60263 15.5466 8.39715 16.8848C9.05546 15.1882 9.66837 13.635 10.3494 11.9623ZM26.9662 12.1535C25.2864 10.3852 23.6065 8.61694 21.9494 6.87257C22.2445 8.16293 22.5396 9.54887 22.8574 10.9109C22.8801 11.0304 22.9936 11.1499 23.1071 11.1977C24.401 11.5083 25.695 11.8189 26.9662 12.1535ZM6.513 12.1535C6.6038 12.1296 6.7627 12.1296 6.92161 12.0818C7.96583 11.8189 9.01006 11.5322 10.0543 11.3171C10.4856 11.2216 10.6672 11.0065 10.7126 10.6003C10.7353 10.433 10.7807 10.2896 10.8034 10.1224C11.0077 9.07096 11.212 7.99566 11.4163 6.96815C9.78188 8.71252 8.14744 10.433 6.513 12.1535ZM21.3138 28.737C21.6089 27.2315 21.8813 25.8695 22.1991 24.3402C20.61 25.0571 19.1345 25.7022 17.5455 26.4191C18.8394 27.2076 20.0198 27.9484 21.3138 28.737ZM11.9611 5.1043C13.2551 3.71836 14.4809 2.40411 15.7067 1.06596C14.0269 1.18544 12.3697 1.56777 10.758 2.30853C11.1666 3.26435 11.5525 4.17238 11.9611 5.1043ZM17.5001 8.832C19.1118 9.52497 20.5646 10.1701 22.1764 10.887C21.8132 9.3338 21.5181 7.97176 21.1776 6.51414C19.9517 7.27879 18.794 8.01956 17.5001 8.832ZM27.3067 29.8839C27.284 29.8362 27.284 29.7645 27.2613 29.7167C25.5588 29.7167 23.8562 29.7167 22.0856 29.7167C22.5169 30.7203 22.9028 31.7 23.3341 32.6797C24.8324 31.9151 26.1717 31.0787 27.3067 29.8839ZM11.3255 28.1157C11.1212 26.9448 10.8942 25.7261 10.6899 24.4836C10.6218 24.1012 10.4402 24.0056 10.1451 23.934C9.03276 23.6711 7.94313 23.3844 6.83081 23.1215C6.7173 23.0976 6.5811 23.0976 6.5811 23.0976C8.12474 24.7464 9.73648 26.4191 11.3255 28.1157ZM21.6316 30.3141C20.383 31.6283 19.1345 32.9426 17.9768 34.1612C19.4977 34.0418 21.1322 33.6833 22.7212 32.9426C22.3126 31.9629 21.9267 31.0548 21.6316 30.3141ZM26.9435 23.241C26.9435 23.241 26.8981 23.1932 26.8754 23.1932C25.6269 23.4799 24.3783 23.7667 23.1071 24.0534C23.0163 24.0773 22.9028 24.2207 22.8801 24.3402C22.6077 25.6544 22.358 26.9687 22.1083 28.2113C23.6973 26.5625 25.3091 24.9137 26.9435 23.241ZM12.0746 28.5458C13.414 27.805 14.6398 27.1121 15.9337 26.3952C14.3674 25.7261 12.9146 25.1048 11.3482 24.4119C11.5979 25.8217 11.8249 27.136 12.0746 28.5458ZM31.3247 10.8631C30.4167 9.4055 29.5768 8.01956 28.7368 6.65751C28.646 6.68141 28.5552 6.7292 28.4644 6.75309C28.4644 8.54526 28.4644 10.3135 28.4644 12.1774C29.3271 11.795 30.2351 11.3649 31.3247 10.8631ZM32.4597 18.8442C31.2793 20.0868 30.0762 21.3532 28.8504 22.6197C29.6222 23.002 30.4621 23.4083 31.3701 23.8384C31.983 22.1418 32.4143 20.493 32.4597 18.8442ZM5.08286 28.5458C5.08286 26.7058 5.08286 24.9137 5.08286 23.0976C4.62885 23.3127 4.17484 23.5038 3.74353 23.7189C3.28952 23.934 2.83551 24.149 2.38149 24.3641C2.81281 25.6544 4.31104 27.9962 5.08286 28.5458ZM9.91808 32.5125C10.3721 31.5088 10.8034 30.5291 11.2801 29.4538C9.48677 29.5255 7.82963 29.5972 6.17249 29.6689C7.26212 30.9115 8.51065 31.7956 9.91808 32.5125ZM11.4617 5.63C10.985 4.5547 10.5537 3.59889 10.1224 2.59528C8.69225 3.31214 7.44372 4.17238 6.39949 5.41494C8.03393 5.48663 9.69108 5.55831 11.4617 5.63ZM22.5623 2.18905C20.996 1.54387 19.4523 1.08986 17.9087 1.06596C19.0891 2.33243 20.2468 3.59889 21.45 4.88925C21.8132 4.02901 22.1764 3.14487 22.5623 2.18905ZM31.2339 24.5552C30.1897 24.0534 29.2817 23.6233 28.2828 23.1454C28.3509 25.0093 28.419 26.7536 28.4871 28.498C28.5553 28.5219 28.6461 28.5458 28.7142 28.5697C29.5314 27.2554 30.3486 25.9412 31.2339 24.5552ZM1.08756 18.6292C1.01946 20.039 1.65508 22.8826 2.19989 23.6711C3.01711 23.2649 3.85703 22.8826 4.67425 22.4763C3.47112 21.186 2.31339 19.9195 1.08756 18.6292ZM32.4597 16.4786C32.4143 14.8298 32.0511 13.2049 31.4382 11.58C30.5302 11.9862 29.6903 12.3685 28.8731 12.727C30.0989 14.0173 31.2793 15.236 32.4597 16.4786ZM4.85586 6.99205C3.76623 8.16293 2.97171 9.45329 2.3588 10.9348C3.31222 11.3649 4.19754 11.795 5.17366 12.2252C5.08286 10.4091 4.96936 8.68863 4.85586 6.99205ZM1.06486 16.4069C2.22259 15.1643 3.40302 13.9456 4.58345 12.7031C3.83433 12.3446 3.01711 11.9862 2.13179 11.58C1.54158 13.2049 1.13296 14.782 1.06486 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Champagne" && "active-fancy"
                    }
                    content="Champán"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.9165 17.6374C32.9165 27.1725 26.0339 34.3453 17.0335 34.9022C8.03306 34.3453 1.67984 27.1052 0.620972 17.6374C1.15041 8.16953 8.03306 0.929429 17.0335 0.372498C25.5044 0.929429 32.9165 8.10224 32.9165 17.6374Z"
                          fill="#E1D393"
                        />
                        <path
                          d="M33.446 17.6255C33.3779 27.2554 26.023 34.9498 17.0108 34.902C7.95331 34.8542 0.643727 27.3988 0.621027 17.6733C0.598326 8.18683 7.61281 0.420779 17.0335 0.372988C26.2046 0.301302 33.3098 8.09124 33.446 17.6255ZM9.11104 17.6017C9.15644 17.7211 9.17914 17.8406 9.22454 17.9362C9.90556 19.6806 10.5866 21.4249 11.2903 23.1693C11.3811 23.3844 11.6081 23.5994 11.8351 23.695C13.4241 24.4119 15.0359 25.1048 16.6476 25.7978C16.8519 25.8934 17.1697 25.8934 17.3967 25.7978C19.0312 25.1048 20.6429 24.388 22.2547 23.6472C22.459 23.5516 22.686 23.3127 22.7768 23.0737C23.4578 21.401 24.1388 19.7045 24.7971 18.0079C24.8879 17.7928 24.8879 17.4822 24.7971 17.291C24.1388 15.5466 23.4578 13.8262 22.7541 12.1057C22.6633 11.8906 22.459 11.6756 22.2547 11.6039C20.6429 10.8631 19.0312 10.1463 17.3967 9.45328C17.1697 9.3577 16.8292 9.3577 16.6022 9.45328C15.0132 10.1224 13.4241 10.7914 11.8351 11.5322C11.5854 11.6517 11.313 11.9145 11.1995 12.2013C10.5185 13.8501 9.90556 15.4989 9.26994 17.1715C9.20184 17.291 9.15644 17.4583 9.11104 17.6017ZM12.7658 29.0954C14.2187 30.6247 15.6715 32.1301 17.0335 33.5877C18.3502 32.1779 19.7122 30.7203 21.0742 29.2388C19.8484 28.498 18.5545 27.6856 17.2378 26.897C17.1016 26.8014 16.8292 26.8492 16.6703 26.9209C16.012 27.2554 15.3537 27.6378 14.7181 27.9962C14.0371 28.3785 13.356 28.7609 12.7658 29.0954ZM28.2703 13.3483C27.4077 14.7581 26.5905 16.0962 25.8187 17.4344C25.7506 17.5539 25.796 17.8167 25.8868 17.9601C26.6132 19.2265 27.3396 20.4691 28.066 21.7117C28.1114 21.8073 28.2022 21.879 28.293 21.9745C29.7458 20.5169 31.176 19.0832 32.6288 17.6017C31.1533 16.1679 29.7459 14.782 28.2703 13.3483ZM5.72865 21.9267C5.79676 21.8073 5.81946 21.7595 5.86486 21.6878C6.61398 20.4213 7.3858 19.1788 8.13491 17.9123C8.22572 17.745 8.18032 17.4105 8.06682 17.2432C7.522 16.3113 6.95448 15.4033 6.40967 14.4713C6.18266 14.1129 5.95566 13.7545 5.70596 13.3722C4.23042 14.8298 2.82298 16.2157 1.37015 17.6494C2.82298 19.0832 4.25312 20.4691 5.72865 21.9267ZM12.8112 5.94065C14.1733 6.75309 15.4672 7.54164 16.7611 8.3063C16.92 8.40188 17.1924 8.35409 17.374 8.25851C18.5091 7.56554 19.6441 6.82478 20.7791 6.10791C20.8926 6.03622 20.9607 5.94064 21.1423 5.77338C19.7122 4.36354 18.3048 2.9776 17.0108 1.71114C15.6715 3.04929 14.2641 4.45913 12.8112 5.94065ZM10.9952 6.29908C9.26994 6.22739 7.522 6.15571 5.70596 6.06012C5.81946 7.94787 5.93296 9.71613 6.06916 11.4844C7.7036 9.76392 9.33805 8.06735 10.9952 6.29908ZM27.8617 23.9818C26.2954 25.6067 24.6836 27.2793 22.9811 29.0237C24.275 29.0237 25.5689 28.9998 26.8402 29.0237C28.0433 29.0476 28.0433 29.0715 28.0206 27.8289C28.0206 27.4705 28.0206 27.1121 27.9979 26.7536C27.9525 25.7739 27.9071 24.7942 27.8617 23.9818ZM27.9752 11.5322C27.9752 9.71614 27.9752 7.97177 27.9752 6.29908C26.3181 6.29908 24.6609 6.29908 23.0038 6.29908C24.6382 8.04345 26.25 9.71614 27.9752 11.5322ZM10.6774 28.7848C9.15644 27.1599 7.6128 25.4872 6.02376 23.8145C6.02376 25.4872 6.02376 27.2077 6.02376 28.9998C7.6355 28.9281 9.24724 28.8564 10.6774 28.7848ZM15.8531 34.1374C14.6046 32.8231 13.3106 31.4611 11.994 30.0751C11.6081 30.9115 11.1995 31.8434 10.7682 32.8231C12.4707 33.6355 14.1733 34.0657 15.8531 34.1374ZM27.6801 12.9898C26.2273 12.6314 24.8652 12.2969 23.4124 11.9145C24.0707 13.6111 24.6836 15.1643 25.3419 16.837C26.1592 15.5227 26.8856 14.3041 27.6801 12.9898ZM10.5866 23.2649C9.92826 21.5922 9.31534 20.039 8.65702 18.3663C7.8398 19.7284 7.11339 20.947 6.31887 22.2374C7.74901 22.5958 9.11104 22.9065 10.5866 23.2649ZM12.448 6.53803C12.1529 7.99566 11.9032 9.3816 11.5854 10.9348C13.2198 10.2179 14.6954 9.54887 16.3071 8.832C14.9451 8.01956 13.742 7.30269 12.448 6.53803ZM25.3419 18.3902C24.6836 20.0629 24.0707 21.6161 23.4124 23.2888C24.8652 22.9543 26.2046 22.6436 27.6347 22.333C26.8629 21.0187 26.1365 19.7523 25.3419 18.3902ZM22.2093 5.48663C24.048 5.48663 25.8187 5.48663 27.5666 5.48663C26.3862 4.17238 25.0241 3.19266 23.4351 2.4758C23.0038 3.5033 22.6179 4.48302 22.2093 5.48663ZM10.5866 11.9623C9.11104 12.3207 7.77171 12.6553 6.34157 13.0137C7.11339 14.328 7.83981 15.5466 8.63433 16.8848C9.29265 15.1882 9.90556 13.635 10.5866 11.9623ZM27.2034 12.1535C25.5235 10.3852 23.8437 8.61694 22.1866 6.87257C22.4817 8.16293 22.7768 9.54887 23.0946 10.9109C23.1173 11.0304 23.2308 11.1499 23.3443 11.1977C24.6382 11.5083 25.9322 11.8189 27.2034 12.1535ZM6.75018 12.1535C6.84098 12.1296 6.99989 12.1296 7.15879 12.0818C8.20302 11.8189 9.24724 11.5322 10.2915 11.3171C10.7228 11.2216 10.9044 11.0065 10.9498 10.6003C10.9725 10.433 11.0179 10.2896 11.0406 10.1224C11.2449 9.07096 11.4492 7.99566 11.6535 6.96815C10.0191 8.71252 8.38462 10.433 6.75018 12.1535ZM21.551 28.737C21.8461 27.2315 22.1185 25.8695 22.4363 24.3402C20.8472 25.0571 19.3717 25.7022 17.7827 26.4191C19.0766 27.2076 20.257 27.9484 21.551 28.737ZM12.1983 5.1043C13.4922 3.71836 14.7181 2.40411 15.9439 1.06596C14.2641 1.18544 12.6069 1.56777 10.9952 2.30853C11.4038 3.26435 11.7897 4.17238 12.1983 5.1043ZM17.7373 8.832C19.349 9.52497 20.8018 10.1701 22.4136 10.887C22.0504 9.3338 21.7553 7.97176 21.4147 6.51414C20.1889 7.27879 19.0312 8.01956 17.7373 8.832ZM27.5439 29.8839C27.5212 29.8362 27.5212 29.7645 27.4985 29.7167C25.796 29.7167 24.0934 29.7167 22.3228 29.7167C22.7541 30.7203 23.14 31.7 23.5713 32.6797C25.0695 31.9151 26.4089 31.0787 27.5439 29.8839ZM11.5627 28.1157C11.3584 26.9448 11.1314 25.7261 10.9271 24.4836C10.859 24.1012 10.6774 24.0056 10.3823 23.934C9.26994 23.6711 8.18032 23.3844 7.06799 23.1215C6.95449 23.0976 6.81828 23.0976 6.81828 23.0976C8.36192 24.7464 9.97366 26.4191 11.5627 28.1157ZM21.8688 30.3141C20.6202 31.6283 19.3717 32.9426 18.214 34.1612C19.7349 34.0418 21.3693 33.6833 22.9584 32.9426C22.5498 31.9629 22.1639 31.0548 21.8688 30.3141ZM27.1807 23.241C27.1807 23.241 27.1353 23.1932 27.1126 23.1932C25.8641 23.4799 24.6155 23.7667 23.3443 24.0534C23.2535 24.0773 23.14 24.2207 23.1173 24.3402C22.8449 25.6544 22.5952 26.9687 22.3455 28.2113C23.9345 26.5625 25.5462 24.9137 27.1807 23.241ZM12.3118 28.5458C13.6512 27.805 14.877 27.1121 16.1709 26.3952C14.6046 25.7261 13.1517 25.1048 11.5854 24.4119C11.8351 25.8217 12.0621 27.136 12.3118 28.5458ZM31.5619 10.8631C30.6539 9.4055 29.814 8.01956 28.974 6.65751C28.8832 6.68141 28.7924 6.7292 28.7016 6.75309C28.7016 8.54526 28.7016 10.3135 28.7016 12.1774C29.5642 11.795 30.4723 11.3649 31.5619 10.8631ZM32.6969 18.8442C31.5165 20.0868 30.3134 21.3532 29.0875 22.6197C29.8594 23.002 30.6993 23.4083 31.6073 23.8384C32.2202 22.1418 32.6515 20.493 32.6969 18.8442ZM5.32005 28.5458C5.32005 26.7058 5.32005 24.9137 5.32005 23.0976C4.86603 23.3127 4.41202 23.5038 3.98071 23.7189C3.5267 23.934 3.07269 24.149 2.61868 24.3641C3.04999 25.6544 4.54823 27.9962 5.32005 28.5458ZM10.1553 32.5125C10.6093 31.5088 11.0406 30.5291 11.5173 29.4538C9.72395 29.5255 8.06681 29.5972 6.40967 29.6689C7.4993 30.9115 8.74783 31.7956 10.1553 32.5125ZM11.6989 5.63C11.2222 4.5547 10.7909 3.59889 10.3596 2.59528C8.92943 3.31214 7.6809 4.17238 6.63668 5.41494C8.27112 5.48663 9.92826 5.55831 11.6989 5.63ZM22.7995 2.18905C21.2331 1.54387 19.6895 1.08986 18.1459 1.06596C19.3263 2.33243 20.484 3.59889 21.6872 4.88925C22.0504 4.02901 22.4136 3.14487 22.7995 2.18905ZM31.4711 24.5552C30.4269 24.0534 29.5188 23.6233 28.52 23.1454C28.5881 25.0093 28.6562 26.7536 28.7243 28.498C28.7924 28.5219 28.8832 28.5458 28.9513 28.5697C29.7686 27.2554 30.5858 25.9412 31.4711 24.5552ZM1.32475 18.6292C1.25664 20.039 1.89226 22.8826 2.43707 23.6711C3.25429 23.2649 4.09422 22.8826 4.91144 22.4763C3.70831 21.186 2.55058 19.9195 1.32475 18.6292ZM32.6969 16.4786C32.6515 14.8298 32.2883 13.2049 31.6754 11.58C30.7674 11.9862 29.9275 12.3685 29.1102 12.727C30.3361 14.0173 31.5165 15.236 32.6969 16.4786ZM5.09304 6.99205C4.00341 8.16293 3.20889 9.45329 2.59598 10.9348C3.5494 11.3649 4.43472 11.795 5.41085 12.2252C5.32004 10.4091 5.20654 8.68863 5.09304 6.99205ZM1.30204 16.4069C2.45977 15.1643 3.6402 13.9456 4.82063 12.7031C4.07151 12.3446 3.25429 11.9862 2.36897 11.58C1.77876 13.2049 1.37015 14.782 1.30204 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Cognac" && "active-fancy"
                    }
                    content="Coñac"
                  >
                    <span>
                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 34 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.1538 17.6374C33.1538 27.1725 26.2711 34.3453 17.2706 34.9022C8.27008 34.3453 1.91679 27.1052 0.85791 17.6374C1.38735 8.16953 8.27008 0.929429 17.2706 0.372498C25.7416 0.929429 33.1538 8.10224 33.1538 17.6374Z"
                          fill="#A72114"
                        />
                        <path
                          d="M33.6831 17.6255C33.615 27.2554 26.26 34.9498 17.2478 34.902C8.19028 34.8542 0.880666 27.3988 0.857965 17.6733C0.835264 8.18683 7.84977 0.420779 17.2705 0.372988C26.4416 0.301302 33.5469 8.09124 33.6831 17.6255ZM9.34801 17.6017C9.39341 17.7211 9.41611 17.8406 9.46151 17.9362C10.1425 19.6806 10.8236 21.4249 11.5273 23.1693C11.6181 23.3844 11.8451 23.5994 12.0721 23.695C13.6611 24.4119 15.2729 25.1048 16.8846 25.7978C17.0889 25.8934 17.4067 25.8934 17.6337 25.7978C19.2682 25.1048 20.8799 24.388 22.4917 23.6472C22.696 23.5516 22.923 23.3127 23.0138 23.0737C23.6948 21.401 24.3758 19.7045 25.0342 18.0079C25.125 17.7928 25.125 17.4822 25.0342 17.291C24.3758 15.5466 23.6948 13.8262 22.9911 12.1057C22.9003 11.8906 22.696 11.6756 22.4917 11.6039C20.8799 10.8631 19.2682 10.1463 17.6337 9.45328C17.4067 9.3577 17.0662 9.3577 16.8392 9.45328C15.2502 10.1224 13.6611 10.7914 12.0721 11.5322C11.8224 11.6517 11.55 11.9145 11.4365 12.2013C10.7554 13.8501 10.1425 15.4989 9.50691 17.1715C9.43881 17.291 9.39341 17.4583 9.34801 17.6017ZM13.0028 29.0954C14.4557 30.6247 15.9085 32.1301 17.2705 33.5877C18.5872 32.1779 19.9492 30.7203 21.3113 29.2388C20.0854 28.498 18.7915 27.6856 17.4748 26.897C17.3386 26.8014 17.0662 26.8492 16.9073 26.9209C16.249 27.2554 15.5907 27.6378 14.9551 27.9962C14.274 28.3785 13.593 28.7609 13.0028 29.0954ZM28.5074 13.3483C27.6447 14.7581 26.8275 16.0962 26.0557 17.4344C25.9876 17.5539 26.033 17.8167 26.1238 17.9601C26.8502 19.2265 27.5766 20.4691 28.303 21.7117C28.3485 21.8073 28.4393 21.879 28.5301 21.9745C29.9829 20.5169 31.413 19.0832 32.8659 17.6017C31.3903 16.1679 29.9829 14.782 28.5074 13.3483ZM5.96561 21.9267C6.03371 21.8073 6.05642 21.7595 6.10182 21.6878C6.85094 20.4213 7.62276 19.1788 8.37188 17.9123C8.46268 17.745 8.41728 17.4105 8.30378 17.2432C7.75897 16.3113 7.19145 15.4033 6.64663 14.4713C6.41962 14.1129 6.19262 13.7545 5.94291 13.3722C4.46737 14.8298 3.05993 16.2157 1.60709 17.6494C3.05993 19.0832 4.49007 20.4691 5.96561 21.9267ZM13.0482 5.94065C14.4103 6.75309 15.7042 7.54164 16.9981 8.3063C17.157 8.40188 17.4294 8.35409 17.611 8.25851C18.7461 7.56554 19.8811 6.82478 21.0161 6.10791C21.1297 6.03622 21.1977 5.94064 21.3794 5.77338C19.9492 4.36354 18.5418 2.9776 17.2478 1.71114C15.9085 3.04929 14.5011 4.45913 13.0482 5.94065ZM11.2322 6.29908C9.50692 6.22739 7.75896 6.15571 5.94291 6.06012C6.05642 7.94787 6.16992 9.71613 6.30612 11.4844C7.94057 9.76392 9.57502 8.06735 11.2322 6.29908ZM28.0987 23.9818C26.5324 25.6067 24.9207 27.2793 23.2181 29.0237C24.512 29.0237 25.806 28.9998 27.0772 29.0237C28.2803 29.0476 28.2804 29.0715 28.2577 27.8289C28.2577 27.4705 28.2577 27.1121 28.235 26.7536C28.1895 25.7739 28.1441 24.7942 28.0987 23.9818ZM28.2122 11.5322C28.2122 9.71614 28.2122 7.97177 28.2122 6.29908C26.5551 6.29908 24.898 6.29908 23.2408 6.29908C24.8753 8.04345 26.487 9.71614 28.2122 11.5322ZM10.9144 28.7848C9.39341 27.1599 7.84977 25.4872 6.26072 23.8145C6.26072 25.4872 6.26072 27.2077 6.26072 28.9998C7.87247 28.9281 9.48422 28.8564 10.9144 28.7848ZM16.0901 34.1374C14.8416 32.8231 13.5476 31.4611 12.231 30.0751C11.8451 30.9115 11.4365 31.8434 11.0052 32.8231C12.7077 33.6355 14.4103 34.0657 16.0901 34.1374ZM27.9171 12.9898C26.4643 12.6314 25.1023 12.2969 23.6494 11.9145C24.3077 13.6111 24.9207 15.1643 25.579 16.837C26.3962 15.5227 27.1226 14.3041 27.9171 12.9898ZM10.8235 23.2649C10.1652 21.5922 9.55231 20.039 8.89399 18.3663C8.07677 19.7284 7.35035 20.947 6.55583 22.2374C7.98597 22.5958 9.34801 22.9065 10.8235 23.2649ZM12.685 6.53803C12.3899 7.99566 12.1402 9.3816 11.8224 10.9348C13.4568 10.2179 14.9324 9.54887 16.5441 8.832C15.1821 8.01956 13.9789 7.30269 12.685 6.53803ZM25.579 18.3902C24.9207 20.0629 24.3077 21.6161 23.6494 23.2888C25.1023 22.9543 26.4416 22.6436 27.8717 22.333C27.0999 21.0187 26.3735 19.7523 25.579 18.3902ZM22.4463 5.48663C24.285 5.48663 26.0557 5.48663 27.8036 5.48663C26.6232 4.17238 25.2612 3.19266 23.6721 2.4758C23.2408 3.5033 22.8549 4.48302 22.4463 5.48663ZM10.8235 11.9623C9.34801 12.3207 8.00867 12.6553 6.57853 13.0137C7.35035 14.328 8.07678 15.5466 8.8713 16.8848C9.52962 15.1882 10.1425 13.635 10.8235 11.9623ZM27.4404 12.1535C25.7606 10.3852 24.0807 8.61694 22.4236 6.87257C22.7187 8.16293 23.0138 9.54887 23.3316 10.9109C23.3543 11.0304 23.4678 11.1499 23.5813 11.1977C24.8753 11.5083 26.1692 11.8189 27.4404 12.1535ZM6.98714 12.1535C7.07794 12.1296 7.23685 12.1296 7.39575 12.0818C8.43998 11.8189 9.48421 11.5322 10.5284 11.3171C10.9598 11.2216 11.1414 11.0065 11.1868 10.6003C11.2095 10.433 11.2549 10.2896 11.2776 10.1224C11.4819 9.07096 11.6862 7.99566 11.8905 6.96815C10.256 8.71252 8.62159 10.433 6.98714 12.1535ZM21.788 28.737C22.0831 27.2315 22.3555 25.8695 22.6733 24.3402C21.0842 25.0571 19.6087 25.7022 18.0197 26.4191C19.3136 27.2076 20.494 27.9484 21.788 28.737ZM12.4353 5.1043C13.7292 3.71836 14.9551 2.40411 16.1809 1.06596C14.5011 1.18544 12.8439 1.56777 11.2322 2.30853C11.6408 3.26435 12.0267 4.17238 12.4353 5.1043ZM17.9743 8.832C19.586 9.52497 21.0388 10.1701 22.6506 10.887C22.2874 9.3338 21.9923 7.97176 21.6518 6.51414C20.4259 7.27879 19.2682 8.01956 17.9743 8.832ZM27.7809 29.8839C27.7582 29.8362 27.7582 29.7645 27.7355 29.7167C26.033 29.7167 24.3304 29.7167 22.5598 29.7167C22.9911 30.7203 23.377 31.7 23.8083 32.6797C25.3066 31.9151 26.6459 31.0787 27.7809 29.8839ZM11.7997 28.1157C11.5954 26.9448 11.3684 25.7261 11.1641 24.4836C11.096 24.1012 10.9144 24.0056 10.6192 23.934C9.50691 23.6711 8.41728 23.3844 7.30495 23.1215C7.19145 23.0976 7.05524 23.0976 7.05524 23.0976C8.59889 24.7464 10.2106 26.4191 11.7997 28.1157ZM22.1058 30.3141C20.8572 31.6283 19.6087 32.9426 18.451 34.1612C19.9719 34.0418 21.6064 33.6833 23.1954 32.9426C22.7868 31.9629 22.4009 31.0548 22.1058 30.3141ZM27.4177 23.241C27.4177 23.241 27.3723 23.1932 27.3496 23.1932C26.1011 23.4799 24.8526 23.7667 23.5813 24.0534C23.4905 24.0773 23.377 24.2207 23.3543 24.3402C23.0819 25.6544 22.8322 26.9687 22.5825 28.2113C24.1715 26.5625 25.7833 24.9137 27.4177 23.241ZM12.5488 28.5458C13.8881 27.805 15.114 27.1121 16.4079 26.3952C14.8416 25.7261 13.3887 25.1048 11.8224 24.4119C12.0721 25.8217 12.2991 27.136 12.5488 28.5458ZM31.799 10.8631C30.8909 9.4055 30.051 8.01956 29.2111 6.65751C29.1203 6.68141 29.0295 6.7292 28.9387 6.75309C28.9387 8.54526 28.9387 10.3135 28.9387 12.1774C29.8013 11.795 30.7093 11.3649 31.799 10.8631ZM32.934 18.8442C31.7536 20.0868 30.5504 21.3532 29.3246 22.6197C30.0964 23.002 30.9363 23.4083 31.8444 23.8384C32.4573 22.1418 32.8886 20.493 32.934 18.8442ZM5.557 28.5458C5.557 26.7058 5.557 24.9137 5.557 23.0976C5.10299 23.3127 4.64897 23.5038 4.21766 23.7189C3.76365 23.934 3.30964 24.149 2.85562 24.3641C3.28694 25.6544 4.78518 27.9962 5.557 28.5458ZM10.3922 32.5125C10.8463 31.5088 11.2776 30.5291 11.7543 29.4538C9.96093 29.5255 8.30378 29.5972 6.64663 29.6689C7.73626 30.9115 8.9848 31.7956 10.3922 32.5125ZM11.9359 5.63C11.4592 4.5547 11.0279 3.59889 10.5965 2.59528C9.1664 3.31214 7.91787 4.17238 6.87364 5.41494C8.50808 5.48663 10.1652 5.55831 11.9359 5.63ZM23.0365 2.18905C21.4702 1.54387 19.9265 1.08986 18.3829 1.06596C19.5633 2.33243 20.721 3.59889 21.9242 4.88925C22.2874 4.02901 22.6506 3.14487 23.0365 2.18905ZM31.7081 24.5552C30.6639 24.0534 29.7559 23.6233 28.7571 23.1454C28.8252 25.0093 28.8933 26.7536 28.9614 28.498C29.0295 28.5219 29.1203 28.5458 29.1884 28.5697C30.0056 27.2554 30.8228 25.9412 31.7081 24.5552ZM1.56169 18.6292C1.49358 20.039 2.1292 22.8826 2.67402 23.6711C3.49124 23.2649 4.33117 22.8826 5.14839 22.4763C3.94526 21.186 2.78752 19.9195 1.56169 18.6292ZM32.934 16.4786C32.8886 14.8298 32.5254 13.2049 31.9125 11.58C31.0044 11.9862 30.1645 12.3685 29.3473 12.727C30.5731 14.0173 31.7536 15.236 32.934 16.4786ZM5.33 6.99205C4.24036 8.16293 3.44584 9.45329 2.83292 10.9348C3.78635 11.3649 4.67168 11.795 5.6478 12.2252C5.557 10.4091 5.4435 8.68863 5.33 6.99205ZM1.53898 16.4069C2.69672 15.1643 3.87715 13.9456 5.05759 12.7031C4.30846 12.3446 3.49124 11.9862 2.60592 11.58C2.0157 13.2049 1.60709 14.782 1.53898 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                  <MiniButton
                    className={
                      infos.color.fancyColor === "Chameleon" && "active-fancy"
                    }
                    content="Camaleón"
                  >
                    <span>
                      <svg
                        width="33"
                        height="35"
                        viewBox="0 0 33 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        content="Yellow"
                        <path
                          d="M32.3906 17.6374C32.3906 27.1725 25.508 34.3453 16.5076 34.9022C7.50728 34.3453 1.15408 27.1052 0.0952148 17.6374C0.624648 8.16953 7.50728 0.929429 16.5076 0.372498C24.9786 0.929429 32.3906 8.10224 32.3906 17.6374Z"
                          fill="#A9B54D"
                        />
                        <path
                          d="M32.92 17.6255C32.8519 27.2554 25.497 34.9498 16.485 34.902C7.4275 34.8542 0.11797 27.3988 0.0952698 17.6733C0.0725694 8.18683 7.087 0.420779 16.5077 0.372988C25.6786 0.301302 32.7838 8.09124 32.92 17.6255ZM8.58522 17.6017C8.63062 17.7211 8.65332 17.8406 8.69872 17.9362C9.37973 19.6806 10.0607 21.4249 10.7645 23.1693C10.8553 23.3844 11.0823 23.5994 11.3093 23.695C12.8983 24.4119 14.51 25.1048 16.1218 25.7978C16.3261 25.8934 16.6439 25.8934 16.8709 25.7978C18.5053 25.1048 20.117 24.388 21.7288 23.6472C21.9331 23.5516 22.1601 23.3127 22.2509 23.0737C22.9319 21.401 23.6129 19.7045 24.2712 18.0079C24.362 17.7928 24.362 17.4822 24.2712 17.291C23.6129 15.5466 22.9319 13.8262 22.2282 12.1057C22.1374 11.8906 21.9331 11.6756 21.7288 11.6039C20.117 10.8631 18.5053 10.1463 16.8709 9.45328C16.6439 9.3577 16.3034 9.3577 16.0763 9.45328C14.4873 10.1224 12.8983 10.7914 11.3093 11.5322C11.0596 11.6517 10.7872 11.9145 10.6737 12.2013C9.99264 13.8501 9.37973 15.4989 8.74412 17.1715C8.67602 17.291 8.63062 17.4583 8.58522 17.6017ZM12.24 29.0954C13.6928 30.6247 15.1456 32.1301 16.5077 33.5877C17.8243 32.1779 19.1863 30.7203 20.5483 29.2388C19.3225 28.498 18.0286 27.6856 16.712 26.897C16.5758 26.8014 16.3034 26.8492 16.1445 26.9209C15.4861 27.2554 14.8278 27.6378 14.1922 27.9962C13.5112 28.3785 12.8302 28.7609 12.24 29.0954ZM27.7444 13.3483C26.8817 14.7581 26.0645 16.0962 25.2927 17.4344C25.2246 17.5539 25.27 17.8167 25.3608 17.9601C26.0872 19.2265 26.8136 20.4691 27.54 21.7117C27.5854 21.8073 27.6763 21.879 27.7671 21.9745C29.2199 20.5169 30.65 19.0832 32.1028 17.6017C30.6273 16.1679 29.2199 14.782 27.7444 13.3483ZM5.20286 21.9267C5.27096 21.8073 5.29366 21.7595 5.33906 21.6878C6.08818 20.4213 6.85999 19.1788 7.6091 17.9123C7.6999 17.745 7.65451 17.4105 7.541 17.2432C6.99619 16.3113 6.42868 15.4033 5.88387 14.4713C5.65687 14.1129 5.42986 13.7545 5.18016 13.3722C3.70463 14.8298 2.29721 16.2157 0.844384 17.6494C2.29721 19.0832 3.72733 20.4691 5.20286 21.9267ZM12.2854 5.94065C13.6474 6.75309 14.9413 7.54164 16.2353 8.3063C16.3942 8.40188 16.6666 8.35409 16.8482 8.25851C17.9832 7.56554 19.1182 6.82478 20.2532 6.10791C20.3667 6.03622 20.4348 5.94064 20.6164 5.77338C19.1863 4.36354 17.7789 2.9776 16.485 1.71114C15.1456 3.04929 13.7382 4.45913 12.2854 5.94065ZM10.4694 6.29908C8.74412 6.22739 6.99619 6.15571 5.18016 6.06012C5.29366 7.94787 5.40716 9.71613 5.54337 11.4844C7.17779 9.76392 8.81222 8.06735 10.4694 6.29908ZM27.3357 23.9818C25.7694 25.6067 24.1577 27.2793 22.4552 29.0237C23.7491 29.0237 25.043 28.9998 26.3142 29.0237C27.5173 29.0476 27.5174 29.0715 27.4947 27.8289C27.4947 27.4705 27.4946 27.1121 27.4719 26.7536C27.4265 25.7739 27.3811 24.7942 27.3357 23.9818ZM27.4492 11.5322C27.4492 9.71614 27.4492 7.97177 27.4492 6.29908C25.7921 6.29908 24.135 6.29908 22.4779 6.29908C24.1123 8.04345 25.724 9.71614 27.4492 11.5322ZM10.1515 28.7848C8.63062 27.1599 7.08699 25.4872 5.49796 23.8145C5.49796 25.4872 5.49796 27.2077 5.49796 28.9998C7.10969 28.9281 8.72142 28.8564 10.1515 28.7848ZM15.3272 34.1374C14.0787 32.8231 12.7848 31.4611 11.4682 30.0751C11.0823 30.9115 10.6737 31.8434 10.2423 32.8231C11.9449 33.6355 13.6474 34.0657 15.3272 34.1374ZM27.1541 12.9898C25.7013 12.6314 24.3393 12.2969 22.8865 11.9145C23.5448 13.6111 24.1577 15.1643 24.816 16.837C25.6332 15.5227 26.3596 14.3041 27.1541 12.9898ZM10.0607 23.2649C9.40243 21.5922 8.78952 20.039 8.13121 18.3663C7.31399 19.7284 6.58758 20.947 5.79307 22.2374C7.2232 22.5958 8.58522 22.9065 10.0607 23.2649ZM11.9222 6.53803C11.6271 7.99566 11.3774 9.3816 11.0596 10.9348C12.694 10.2179 14.1695 9.54887 15.7812 8.832C14.4192 8.01956 13.2161 7.30269 11.9222 6.53803ZM24.816 18.3902C24.1577 20.0629 23.5448 21.6161 22.8865 23.2888C24.3393 22.9543 25.6786 22.6436 27.1087 22.333C26.3369 21.0187 25.6105 19.7523 24.816 18.3902ZM21.6833 5.48663C23.5221 5.48663 25.2927 5.48663 27.0406 5.48663C25.8602 4.17238 24.4982 3.19266 22.9092 2.4758C22.4779 3.5033 22.092 4.48302 21.6833 5.48663ZM10.0607 11.9623C8.58522 12.3207 7.2459 12.6553 5.81577 13.0137C6.58759 14.328 7.314 15.5466 8.10851 16.8848C8.76682 15.1882 9.37973 13.635 10.0607 11.9623ZM26.6774 12.1535C24.9976 10.3852 23.3178 8.61694 21.6606 6.87257C21.9558 8.16293 22.2509 9.54887 22.5687 10.9109C22.5914 11.0304 22.7049 11.1499 22.8184 11.1977C24.1123 11.5083 25.4062 11.8189 26.6774 12.1535ZM6.22438 12.1535C6.31518 12.1296 6.47408 12.1296 6.63298 12.0818C7.6772 11.8189 8.72142 11.5322 9.76564 11.3171C10.1969 11.2216 10.3785 11.0065 10.4239 10.6003C10.4467 10.433 10.492 10.2896 10.5147 10.1224C10.7191 9.07096 10.9234 7.99566 11.1277 6.96815C9.49323 8.71252 7.85881 10.433 6.22438 12.1535ZM21.025 28.737C21.3201 27.2315 21.5925 25.8695 21.9104 24.3402C20.3213 25.0571 18.8458 25.7022 17.2568 26.4191C18.5507 27.2076 19.7311 27.9484 21.025 28.737ZM11.6725 5.1043C12.9664 3.71836 14.1922 2.40411 15.418 1.06596C13.7382 1.18544 12.0811 1.56777 10.4694 2.30853C10.878 3.26435 11.2639 4.17238 11.6725 5.1043ZM17.2114 8.832C18.8231 9.52497 20.2759 10.1701 21.8877 10.887C21.5244 9.3338 21.2293 7.97176 20.8888 6.51414C19.663 7.27879 18.5053 8.01956 17.2114 8.832ZM27.0179 29.8839C26.9952 29.8362 26.9952 29.7645 26.9725 29.7167C25.27 29.7167 23.5675 29.7167 21.7969 29.7167C22.2282 30.7203 22.6141 31.7 23.0454 32.6797C24.5436 31.9151 25.8829 31.0787 27.0179 29.8839ZM11.0369 28.1157C10.8326 26.9448 10.6056 25.7261 10.4012 24.4836C10.3331 24.1012 10.1515 24.0056 9.85644 23.934C8.74412 23.6711 7.6545 23.3844 6.54218 23.1215C6.42868 23.0976 6.29248 23.0976 6.29248 23.0976C7.83611 24.7464 9.44783 26.4191 11.0369 28.1157ZM21.3428 30.3141C20.0943 31.6283 18.8458 32.9426 17.6881 34.1612C19.209 34.0418 20.8434 33.6833 22.4325 32.9426C22.0239 31.9629 21.6379 31.0548 21.3428 30.3141ZM26.6547 23.241C26.6547 23.241 26.6093 23.1932 26.5866 23.1932C25.3381 23.4799 24.0896 23.7667 22.8184 24.0534C22.7276 24.0773 22.6141 24.2207 22.5914 24.3402C22.319 25.6544 22.0693 26.9687 21.8196 28.2113C23.4086 26.5625 25.0203 24.9137 26.6547 23.241ZM11.786 28.5458C13.1253 27.805 14.3511 27.1121 15.645 26.3952C14.0787 25.7261 12.6259 25.1048 11.0596 24.4119C11.3093 25.8217 11.5363 27.136 11.786 28.5458ZM31.0359 10.8631C30.1279 9.4055 29.288 8.01956 28.4481 6.65751C28.3573 6.68141 28.2665 6.7292 28.1757 6.75309C28.1757 8.54526 28.1757 10.3135 28.1757 12.1774C29.0383 11.795 29.9463 11.3649 31.0359 10.8631ZM32.1709 18.8442C30.9905 20.0868 29.7874 21.3532 28.5616 22.6197C29.3334 23.002 30.1733 23.4083 31.0813 23.8384C31.6942 22.1418 32.1255 20.493 32.1709 18.8442ZM4.79425 28.5458C4.79425 26.7058 4.79425 24.9137 4.79425 23.0976C4.34025 23.3127 3.88624 23.5038 3.45493 23.7189C3.00092 23.934 2.54691 24.149 2.09291 24.3641C2.52421 25.6544 4.02244 27.9962 4.79425 28.5458ZM9.62944 32.5125C10.0834 31.5088 10.5148 30.5291 10.9915 29.4538C9.19813 29.5255 7.541 29.5972 5.88387 29.6689C6.97349 30.9115 8.22201 31.7956 9.62944 32.5125ZM11.1731 5.63C10.6964 4.5547 10.265 3.59889 9.83374 2.59528C8.40361 3.31214 7.15509 4.17238 6.11087 5.41494C7.7453 5.48663 9.40244 5.55831 11.1731 5.63ZM22.2736 2.18905C20.7072 1.54387 19.1636 1.08986 17.62 1.06596C18.8004 2.33243 19.9581 3.59889 21.1612 4.88925C21.5244 4.02901 21.8877 3.14487 22.2736 2.18905ZM30.9451 24.5552C29.9009 24.0534 28.9929 23.6233 27.9941 23.1454C28.0622 25.0093 28.1303 26.7536 28.1984 28.498C28.2665 28.5219 28.3573 28.5458 28.4254 28.5697C29.2426 27.2554 30.0598 25.9412 30.9451 24.5552ZM0.798983 18.6292C0.730882 20.039 1.36649 22.8826 1.9113 23.6711C2.72852 23.2649 3.56843 22.8826 4.38565 22.4763C3.18253 21.186 2.0248 19.9195 0.798983 18.6292ZM32.1709 16.4786C32.1255 14.8298 31.7623 13.2049 31.1494 11.58C30.2414 11.9862 29.4015 12.3685 28.5843 12.727C29.8101 14.0173 30.9905 15.236 32.1709 16.4786ZM4.56725 6.99205C3.47763 8.16293 2.68312 9.45329 2.07021 10.9348C3.02362 11.3649 3.90894 11.795 4.88505 12.2252C4.79425 10.4091 4.68075 8.68863 4.56725 6.99205ZM0.776282 16.4069C1.934 15.1643 3.11442 13.9456 4.29484 12.7031C3.54573 12.3446 2.72852 11.9862 1.8432 11.58C1.25299 13.2049 0.844383 14.782 0.776282 16.4069Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </MiniButton>
                </div>
              ) : (
                <>
                  <PriceRange
                    withoutThumbs
                    value={infos?.color?.color}
                    values={["M", "L", "K", "J", "I", "H", "G", "F", "E", "D"]}
                  />
                </>
              )}
              <div className="explication">
                {infos.color.fancyColor ? (
                  <>
                    <strong>{transES[infos?.color?.fancyColor]}</strong>
                  </>
                ) : (
                  <>
                    <strong>{infos?.color?.color}</strong>{" "}
                    {transDescES[infos?.color?.color]}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="clarity">
            <h6>Claridad</h6>
            <div className="flex-infos">
              <PriceRange
                Carat
                Weight
                withoutThumbs
                value={infos?.clarity}
                values={[
                  "I3",
                  "I2",
                  "I1",
                  "SI3",
                  "SI2",
                  "SI1",
                  "VS2",
                  "VS1",
                  "VVS2",
                  "VVS1",
                  "IF",
                ]}
              />
              <div className="explication">
                <strong>{infos?.clarity}</strong> {transDescES[infos?.clarity]}
              </div>
            </div>
          </div>
          <div className="cut">
            <h6>Talla</h6>
            <div className="flex-infos">
              <PriceRange
                withoutThumbs
                value={transES[infos?.cut]}
                values={[
                  "Pobre",
                  "Regular",
                  "Buena",
                  "Muy Buena",
                  "Excellente",
                  "Ideal",
                ]}
              />
              <div className="explication">
                <strong>{transES[infos?.cut]}</strong> {transDescES[infos?.cut]}
              </div>
            </div>
          </div>
        </SinglePageStyled>
      </div>
    )
  );
};

export default SinglePage;
