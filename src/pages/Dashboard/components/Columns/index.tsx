import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { IUser } from "~/models/user.model";
import { IStatus } from "~/models/status.model";

const allColumns = [
  { status: IStatus.REVIEW, title: "Pronto para revisar" },
  { status: IStatus.APPROVED, title: "Aprovado" },
  { status: IStatus.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: IUser[];
  onUpdate: (user: IUser) => void;
};
const Collumns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => (
        <S.Column status={collum.status} key={collum.title}>
          <>
            <S.TitleColumn status={collum.status}>{collum.title}</S.TitleColumn>
            <S.CollumContent>
              {props?.registrations?.map((registration) =>
                registration.status === collum.status ? (
                  <RegistrationCard onUpdate={props.onUpdate} data={registration} key={registration.id} />
                ) : null
              )}
            </S.CollumContent>
          </>
        </S.Column>
      ))}
    </S.Container>
  );
};
export default Collumns;
