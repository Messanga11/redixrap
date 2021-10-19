import ModalFormContent from "../ModalForm/ModalFormContent";
import ModalFormOverlay from "../ModalForm/ModalFormOverlay";

const ModalPDF = ({ url, hideModalPDF }) => {
  return (
    <ModalFormOverlay>
      <ModalFormContent style={{ width: "90vw", maxWidth: "90vw" }}>
        <div className="close-btn" onClick={hideModalPDF}>
          &times;
        </div>
        <div style={{ height: "30px" }}></div>
        <div>
          <object data={url} type="application/pdf" width="100%" height="500">
            <iframe title="Certificado" src={url} width="100%" height="500">
              <p>This browser does not support PDF!</p>
            </iframe>
          </object>
        </div>
      </ModalFormContent>
    </ModalFormOverlay>
  );
};

export default ModalPDF;
