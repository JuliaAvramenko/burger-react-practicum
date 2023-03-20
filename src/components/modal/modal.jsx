import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './modal.css';
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useEffect } from "react";


const modalRoot = document.querySelector("#modals");

export const Modal = ({ children, onClose, onKeyDown }) => {

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown)

        }


    }, []

    )

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

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func
}