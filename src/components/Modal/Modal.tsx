import React, { FC } from "react";
import ReactModal from "react-modal";
import { Children } from "src/@types";
import { CloseIcon } from "src/assets/icons";

import style from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: Children;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal className={style.containerModal} isOpen={isOpen} onRequestClose={onClose}>
      <div onClick={onClose} className={style.closeModal}>
        <CloseIcon fill="black" />
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
