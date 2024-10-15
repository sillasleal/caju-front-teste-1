import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { IUser } from "~/models/user.model";
import { IStatus } from "~/models/status.model";
import useApi from "~/hooks/useApi";
import { ConfirmModal } from "~/components/ConfirmModal";
import { useState } from "react";

export type RegistrationCardProps = {
  data: IUser;
  onUpdate: (user: IUser) => void;
};

type Modal = {
  message: string;
  onConfirm: () => void;
} | null;

const RegistrationCard = ({ data, onUpdate }: RegistrationCardProps) => {
  const [modal, setModal] = useState<Modal>(null);
  const { updateUser, deleteUser } = useApi();

  const closeModal = () => setModal(null);
  const openModal = (modal: Modal) => setModal(modal);

  const updateStatus = (status: IStatus) => {
    openModal({
      message: `Deseja mesmo alterar o status para ${status}?`,
      onConfirm: () => updateUser({ ...data, status }).then(onUpdate),
    });
  };

  const onDelete = () => {
    openModal({
      message: "Deseja mesmo excluir o usuário?",
      onConfirm: () => deleteUser(data.id).then(onUpdate),
    });
  };

  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {data.status === IStatus.REVIEW && (
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={() => updateStatus(IStatus.REPROVED)}
            >
              Reprovar
            </ButtonSmall>
          )}
          {data.status === IStatus.REVIEW && (
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={() => updateStatus(IStatus.APPROVED)}
            >
              Aprovar
            </ButtonSmall>
          )}
          {(data.status === IStatus.APPROVED ||
            data.status === IStatus.REPROVED) && (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() => updateStatus(IStatus.REVIEW)}
            >
              Revisar novamente
            </ButtonSmall>
          )}

          <HiOutlineTrash onClick={onDelete} aria-label="delete" />
        </S.Actions>
      </S.Card>
      <ConfirmModal
        isOpen={!!modal}
        message={modal?.message || ""}
        onCancel={closeModal}
        onConfirm={() => modal?.onConfirm()}
      />
    </>
  );
};

export default RegistrationCard;
