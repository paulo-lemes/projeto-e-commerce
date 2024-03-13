import ReactModal from "react-modal";
import {BtnAddToCart} from "../Buttons"

ReactModal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "20%",
    bottom: "auto",
    marginRight: "-60%",
    transform: "translate(-50%, -50%)",
  },
};

const Modal = ({
  product,
  modalIsOpen,
  afterOpenModal,
  closeModal,
  showNextModal,
  showPrevModal,
}) => {
  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <h2>{product.title}</h2>
        <img
          src={product.image}
          style={{ maxHeight: "150px", maxWidth: "250px" }}
        ></img>
        <p>{product.description}</p>
        <p>{product.brand}</p>
        <p>{product.category}</p>
        <p>${product.price}</p>
        <BtnAddToCart product={product}/>
        <div>
        <button onClick={showPrevModal}>Previous</button>
        <button onClick={showNextModal}>Next</button>
        </div>
      </ReactModal>
    </>
  );
};

export default Modal;
