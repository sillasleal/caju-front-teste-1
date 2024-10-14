import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import * as S from "./styles";

type FormData = {
  email: string;
  employeeName: string;
};

const NewUserPage = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          {...register("employeeName", {
            required: "Nome obrigatório",
            pattern: {
              value: /^(?!\d)[a-zA-Z]{2,}(?: [a-zA-Z]{2,})+$/,
              message: "Nome inválido",
            },
          })}
          id="nome"
          placeholder="Nome"
          label="Nome"
          error={errors.employeeName?.message}
        />
        <TextField
          {...register("email", {
            required: "Email obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email inválido",
            },
          })}
          id="email"
          label="Email"
          placeholder="Email"
          type="email"
          error={errors.email?.message}
        />
        <TextField placeholder="CPF" label="CPF" />
        <TextField label="Data de admissão" type="date" />
        <Button onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
