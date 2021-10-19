import { useState } from "react";
import ModalFormContent from "./ModalFormContent";
import ModalFormInput from "./ModalFormInput";
import ModalFormOverlay from "./ModalFormOverlay";
import axios from "axios";

const ModalForm = ({ closeModal, feedListingId }) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contactForm, setContactForm] = useState({
    email: "",
    phone: "",
    message: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    message: "",
    firstName: "",
    lastName: "",
  });

  const handleForm = (e) => {
    setErrors((state) => ({ ...state, [e.target.name]: "" }));
    setContactForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const isEmpty = (formName) => {
    if (contactForm[formName]?.length <= 0) {
      setErrors((state) => ({ ...state, [formName]: "Requerido" }));
      return true;
    }
    return false;
  };

  const isFormValid = () => {
    const errorTracking = [];
    const emailRegex =
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\d+$/;
    if (!contactForm.email.match(emailRegex)) {
      setErrors((state) => ({
        ...state,
        email: "Introduzca una dirección de correo electrónico válida",
      }));
      errorTracking.push(true);
    }
    if (!contactForm.phone.match(phoneRegex)) {
      setErrors((state) => ({
        ...state,
        phone: "Ingrese un número de teléfono válido",
      }));
      errorTracking.push(true);
    }
    if (isEmpty("firstName")) errorTracking.push(true);
    if (isEmpty("lastName")) errorTracking.push(true);
    if (isEmpty("email")) errorTracking.push(true);
    if (isEmpty("phone")) errorTracking.push(true);
    if (isEmpty("message")) errorTracking.push(true);
    return errorTracking.length > 0 ? false : true;
  };

  const contactSeller = async (e) => {
    e.preventDefault();
    setErrors((state) => ({
      ...state,
      globalError: "",
    }));
    if (isFormValid()) {
      try {
        setLoading(true);
        const { data } = await axios({
          url:
            "https://ii.api.prod.rapnet.com/api/Feeds/1cb0e937-bd03-429f-a7ff-920a568f02c5/DiamondsListings/" +
            feedListingId +
            "/ContactSeller",
          headers: {
            accept: "application/json, text/plain, */*",
          },
          referrer:
            "https://ii.api.prod.rapnet.com/api/Feeds/1cb0e937-bd03-429f-a7ff-920a568f02c5/Widget",
          referrerPolicy: "strict-origin-when-cross-origin",
          data: JSON.stringify(contactForm),
          method: "POST",
          mode: "cors",
          withCredentials: false,
        });
        if (data.error === 0) {
          setErrors({
            email: "",
            phone: "",
            message: "",
            firstName: "",
            lastName: "",
          });
          setLoading(false);
          setSent(true);
        } else {
          setErrors((state) => ({
            ...state,
            globalError: "Algo salió mal.",
          }));
        }
      } catch (error) {
        setLoading(false);
        setErrors((state) => ({
          ...state,
          globalError: "Algo salió mal.",
        }));
      }
    }
  };
  return (
    <ModalFormOverlay>
      <ModalFormContent>
        <div style={{ display: sent ? "none" : "block" }}>
          <span className="close-btn" onClick={closeModal}>
            &times;
          </span>
          <h2 className="title">Cons&#250;ltanos sobre este diamante</h2>
          <h3>{errors.globalError}</h3>
          <form onSubmit={contactSeller}>
            <ModalFormInput>
              <label htmlFor="firstName">
                Nombre <span>*</span>
              </label>
              <input type="text" name="firstName" onChange={handleForm} />
              <small>{errors.firstName}</small>
            </ModalFormInput>
            <ModalFormInput>
              <label htmlFor="lastName">
                Apellidos <span>*</span>
              </label>
              <input type="text" name="lastName" onChange={handleForm} />
              <small>{errors.lastName}</small>
            </ModalFormInput>
            <ModalFormInput>
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input type="text" name="email" onChange={handleForm} />
              <small>{errors.email}</small>
            </ModalFormInput>
            <ModalFormInput>
              <label htmlFor="phone">
                M&#243;vil <span>*</span>
              </label>
              <input type="text" name="phone" onChange={handleForm} />
              <small>{errors.phone}</small>
            </ModalFormInput>
            <ModalFormInput>
              <label htmlFor="message">
                Mensaje <span>*</span>
              </label>
              <textarea name="message" onChange={handleForm}></textarea>
              <small>{errors.message}</small>
            </ModalFormInput>
            <button
              type="submit"
              style={{ opacity: loading ? 0.5 : 1 }}
              disabled={loading}
            >
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    margin: "auto",
                    background: "transparent",
                    display: "block",
                    shapeRendering: "auto",
                  }}
                  width="60px"
                  height="10px"
                  viewBox="0 0 100 50"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle cx="42" cy="25" r="15" fill="#ffffff">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;1"
                      values="10;0"
                      keySplines="0 0.5 0.5 1"
                      begin="0s"
                    />
                    <animate
                      attributeName="fill"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="discrete"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff"
                      begin="0s"
                    />
                  </circle>
                  <circle cx="8" cy="25" r="15" fill="#ffffff">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="0s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="0s"
                    />
                  </circle>
                  <circle cx="25" cy="25" r="15" fill="#ffffff">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.25s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.25s"
                    />
                  </circle>
                  <circle cx="42" cy="25" r="15" fill="#ffffff">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.5s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.5s"
                    />
                  </circle>
                  <circle cx="8" cy="25" r="15" fill="#ffffff">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.75s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.75s"
                    />
                  </circle>
                </svg>
              ) : (
                "Enviar"
              )}
            </button>
          </form>
        </div>
        {/* Sucess */}
        <div
          className="modal-form-container"
          style={{ display: sent ? "flex" : "none" }}
        >
          <svg
            width="60"
            height="45"
            viewBox="0 0 60 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="16.3787"
              y="40.0231"
              width="55.4479"
              height="5.95213"
              rx="2.97607"
              transform="rotate(-46.2045 16.3787 40.0231)"
              fill="#CAA741"
            />
            <rect
              x="4.20905"
              y="19.3514"
              width="28.8894"
              height="5.95213"
              rx="2.97607"
              transform="rotate(45.0031 4.20905 19.3514)"
              fill="#CAA741"
            />
          </svg>

          <h2>Tu solicitud se ha enviado correctamente</h2>
          <p>Contactaremos contigo lo antes posible.</p>
          <button
            onClick={() => {
              setSent(false);
              closeModal();
            }}
          >
            OK
          </button>
        </div>
      </ModalFormContent>
    </ModalFormOverlay>
  );
};

export default ModalForm;
