import styles from './modal-overlay.module.css';

import { TOnClick } from '../../utils/types';
import { FC } from 'react';

type TModalOverlay = {
    onClick: TOnClick
    onKeyDown?: TOnClick
}
export const ModalOverlay: FC<TModalOverlay> = ({ onClick, onKeyDown }) => {

    return (
        <div onClick={onClick} onKeyDown={onKeyDown} className={styles.modal__overlay}></div>

    )
}
