import ModalFormContent from "../ModalForm/ModalFormContent";
import ModalFormOverlay from "../ModalForm/ModalFormOverlay";

const ModalVideo = ({ url, hideModalVideo }) => {
  return (
    <ModalFormOverlay>
      <ModalFormContent style={{ width: "90vw", maxWidth: "90vw" }}>
        <div className="close-btn" onClick={hideModalVideo}>
          &times;
        </div>
        <div style={{ height: "30px" }}></div>
        <div>
          <iframe
            title="Video"
            src={`${url}`}
            width="100%"
            height="510"
          ></iframe>
        </div>
      </ModalFormContent>
    </ModalFormOverlay>
  );
};

export default ModalVideo;
