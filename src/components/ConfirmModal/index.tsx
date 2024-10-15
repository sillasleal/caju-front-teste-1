import Button from "../Buttons";
import { ButtonCancel, ModalActions, ModalBackground, ModalContainer, ModalMessage } from "./styled";

type ConfirmModalProps = {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({ isOpen, message, onCancel, onConfirm }: ConfirmModalProps) => {
  if (!isOpen) {
    return null;
  }

  return <ModalBackground onClick={onCancel} role="alertdialog" aria-modal="true">
    <ModalContainer>
        <ModalMessage>{message}</ModalMessage>
        <ModalActions>
            <ButtonCancel aria-label="cancelar" onClick={onCancel}>Cancelar</ButtonCancel>
            <Button aria-label="confirmar" onClick={onConfirm}>Confirmar</Button>
        </ModalActions>
    </ModalContainer>
  </ModalBackground>;
};
