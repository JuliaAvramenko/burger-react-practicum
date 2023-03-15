import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './modal.css';
import { ModalOverlay } from "../modal-overlay/modal-overlay";


const modalRoot = document.querySelector("#modals");

export const Modal = ({ onClose, children }) => {
    return createPortal(
        <>
            <div className="modal">
                <div className="modal__close-button"><CloseIcon onClick={onClose} /></div>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        modalRoot

    )
}