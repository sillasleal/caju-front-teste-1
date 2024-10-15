import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "~/models/user.model";
import { useCallback, useEffect, useState } from "react";
import { formatCPF } from "~/utils/format";
import { validateCPF } from "~/utils/validate";

export type SearchBarProps = {
  onSearch: (search?: string) => void;
};

export const SearchBar = (props: SearchBarProps) => {
  const history = useHistory();
  const [cpf, setCpf] = useState<string>("");

  const cpfValid = validateCPF(cpf);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  useEffect(() => {
    setCpf(formatCPF(cpf || ""));
  }, [cpf]);

  useEffect(() => {
    if (cpfValid) {
      props.onSearch(cpf.replace(/\D/g, ""));
    } else {
      props.onSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ cpfValid]);

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        id="cpf"
        label="CPF"
        onChange={(e) => setCpf(e.target.value)}
        value={cpf}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => props.onSearch()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
