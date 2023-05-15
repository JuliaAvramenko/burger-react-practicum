import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';
import { ModalOverlay } from "../modal-overlay/modal-overlay";

import { ReactNode, useEffect } from "react";
import { TOnClick } from "../../utils/types";
import { FC } from 'react';



const modalRoot = document.querySelector<Element>("#modals");
//console.log(`modal Root ${modalRoot}`)

type TModal = {
    readonly children: ReactNode
    onClose: TOnClick
}

export const Modal: FC<TModal> = ({ children, onClose }) => {

    type TEvent = {
        "isTrusted": boolean
    }
    const onKeyDown: EventListener = (evt: any) => {
        //console.log(`onKeydown ${JSON.stringify(evt)}`)
        if (evt.key === "Escape") {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [])

    return createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles["modal__close-button"]}><CloseIcon type="primary" onClick={onClose} /></div>
                {children}
            </div >
            <ModalOverlay onClick={onClose} />
        </>,
        modalRoot!

    )
}

