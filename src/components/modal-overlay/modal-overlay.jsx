import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

export const ModalOverlay = ({ onClick, onKeyDown }) => {

    return (
        <div onClick={onClick} onKeyDown={onKeyDown} className={styles.modal__overlay}></div>

    )
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
}