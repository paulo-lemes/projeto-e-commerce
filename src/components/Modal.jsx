import ReactModal from "react-modal";

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

export default function Modal({
  product,
  modalIsOpen,
  afterOpenModal,
  closeModal,
  showNextModal,
  showPrevModal,
}) {
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
          src={product.thumbnail}
          style={{ maxHeight: "150px", maxWidth: "250px" }}
        ></img>
        <p>Description: {product.description}</p>
        <p>Brand: {product.brand}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}.00</p>
        <button onClick={showPrevModal}>Previous</button>
        <button onClick={showNextModal}>Next</button>
      </ReactModal>
    </>
  );
}
