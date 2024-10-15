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
import { useCallback } from "react";
import { deleteUser, updateUser } from "~/services/user.service";

type Props = {
  data: IUser;
  onUpdate: (user: IUser) => void;
};

const RegistrationCard = ({ data, onUpdate }: Props) => {
  const updateStatus = useCallback(
    (status: IStatus) => {
      updateUser({ ...data, status }).then(onUpdate);
    },
    [data, onUpdate]
  );

  const onDelete = useCallback(() => {
    deleteUser(data.id).then(onUpdate);
  }, [data.id, onUpdate]);

  return (
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
  );
};

export default RegistrationCard;
