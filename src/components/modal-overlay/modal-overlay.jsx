
import './modal-overlay.css';

export const ModalOverlay = ({ onClick }) => {

    return (
        <div onClick={onClick} className="modal__overlay"></div>

    )
}