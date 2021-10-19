import DiamondStyled from "./DiamondStyled";
import DiamondDescStyled from "./DiamondDescStyled";
import PriceStyled from "./PriceStyled";

const Diamond = ({ infos, transES, onClick }) => {
  return (
    <DiamondStyled onClick={onClick}>
      <img
        src={
          (infos.diamondMedia.length > 0 &&
            infos.diamondMedia[0]?.type === "Image" &&
            infos.diamondMedia[0]?.url) ||
          (infos.diamondMedia?.map((el) => el.type).includes("Video") &&
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
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "b668ad48bdf80ab881523b5ce08e4927"
                  : "29187dcaaa03a357b108f52a7c6e1845"
                : infos.shape === "Princess"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "5e5ac84869492fbc56d41198cebb7973"
                  : "867831949eaf9d8187ed873bb15c9fd0"
                : infos.shape === "Emerald"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "d180764f6b680c34bfb55b22e7e7bcec"
                  : "3191b51b565a7451a6855c759b0db3fd"
                : infos.shape === "Cushion" ||
                  infos.shape === "Cushion Modified"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "f805ca415a4b0e2b6333e0054b971bcf"
                  : "0ea50afcb8efe64175ab8eac0e6c5cd2"
                : infos.shape === "Radiant"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "94681d6643991cc51477343d5b89a7c4"
                  : "6463444c244d64eafe268f8ecaf0e0e8"
                : infos.shape === "Pear"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "01c57e8e1ccd2af74a8487e7ed6d3502"
                  : "d15297cc1785bbdd0da241d371c6078a"
                : infos.shape === "Oval"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "fcf94cc8f0f8d70a8c7e020fa998bc99"
                  : "5dc94e59137a28353d3c6be472c56bfc"
                : infos.shape === "Marquise"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
                  ? "3ac1976d6c3de87dbb599d8e1f302721"
                  : "30f75414f05a8cfb4530bdad06a7fae5"
                : infos.shape === "Heart"
                ? !infos.color.fancyColor || infos.color.fancyColor !== "Yellow"
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
              : infos.shape === "Cushion" || infos.shape === "Cushion Modified"
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
        }
        height="auto"
        alt="diamond"
        loading="lazy"
      />
      <DiamondDescStyled>
        <div className="desk-screen">
          {transES[infos.shape]
            ? transES[infos.shape] + ","
            : infos.shape + ","}{" "}
          {infos.carat}Ct.,{" "}
          {infos.color.colorType === "Fancy"
            ? (transES[infos.color.fancyColor] || infos.color.fancyColor) + ", "
            : infos.color.color + ", "
            ? infos.color.color + ", "
            : ""}{" "}
          {infos.clarity}
        </div>
        <div className="desk-screen">
          {infos.cut
            ? transES[infos.cut]
              ? transES[infos.cut] + " Diamante Tallado"
              : infos.cut + " Diamante Tallado"
            : ""}
        </div>
        <div className="flex-desc">
          <div className="flex-desc-left">
            <div className="flex-infos">
              <div className="info">Forma</div>
              <div className="value">
                {transES[infos.shape] ? transES[infos.shape] : infos.shape}
              </div>
            </div>
            <div className="flex-infos">
              <div className="info">Carat</div>
              <div className="value">{infos.carat}</div>
            </div>
            <div className="flex-infos">
              <div className="info">Color</div>
              <div className="value">
                {infos.color.colorType === "Fancy"
                  ? transES[infos.color.fancyColor] || infos.color.fancyColor
                  : infos.color.color
                  ? infos.color.color
                  : ""}
              </div>
            </div>
            <div className="flex-infos">
              <div className="info">Claridad</div>
              <div className="value">{infos.clarity}</div>
            </div>
            <div className="flex-infos">
              <div className="info">Talla</div>
              <div className="value">{transES[infos.cut]}</div>
            </div>
          </div>
          <div className="flex-desc-right">
            <div className="flex-infos">
              <div className="info">Pulido</div>
              <div className="value">{transES[infos.polish]}</div>
            </div>
            <div className="flex-infos">
              <div className="info">Simetria</div>
              <div className="value">{transES[infos.symmetry]}</div>
            </div>
            <div className="flex-infos">
              <div className="info">Lab</div>
              <div className="value">{infos.gradingReport.lab}</div>
            </div>
            <div className="flex-infos">
              <div className="info">Fluor.</div>
              <div className="value">
                {transES[infos.fluorescence?.intensity]}
              </div>
            </div>
            <div className="flex-infos">
              <div className="info">Precio</div>
              <div className="value">
                €{" "}
                {infos.price.totalPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
          </div>
        </div>
      </DiamondDescStyled>
      <PriceStyled>
        €{" "}
        {infos.price.totalPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </PriceStyled>
    </DiamondStyled>
  );
};

export default Diamond;
