import './modal-overlay.css';
import PropTypes from "prop-types";

export const ModalOverlay = ({ onClick, onKeyDown }) => {

    return (
        <div onClick={onClick} onKeyDown={onKeyDown} className="modal__overlay"></div>

    )
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func
}