import ButtonStyled from "./ButtonStyled";

const Button = ({
  text,
  Icon,
  alt,
  colored,
  rotate,
  withSorters,
  showSorters,
  setShowSorters,
  setFilterForm,
  getDiamondsData,
  ...otherPros
}) => {
  return (
    <ButtonStyled
      alt={alt}
      colored={colored}
      onClick={setShowSorters}
      {...otherPros}
    >
      {text}{" "}
      <Icon className={`${colored && "icon"} ${rotate && "arrow-active"}`} />
    </ButtonStyled>
  );
};

export default Button;
