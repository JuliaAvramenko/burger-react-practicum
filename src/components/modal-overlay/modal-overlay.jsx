import './modal-overlay.css';
import PropTypes from "prop-types";

export const ModalOverlay = ({ onClick }) => {

    return (
        <div onClick={onClick} className="modal__overlay"></div>

    )
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func
}