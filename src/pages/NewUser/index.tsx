import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import * as S from "./styles";
import { useCallback, useEffect, useState } from "react";
import { formatCPF } from "~/utils/format";
import { validateCPF } from "~/utils/validate";
import { IUser } from "~/models/user.model";
import useApi from "~/hooks/useApi";
import { ConfirmModal } from "~/components/ConfirmModal";

const NewUserPage = () => {
  const [modal, setModal] = useState(false);
  const { saveUser } = useApi();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IUser>();
  const cpfValue = watch("cpf");

  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const onSubmit: SubmitHandler<IUser> = useCallback(
    (data) => {
      closeModal();
      saveUser({ ...data,
        admissionDate: data.admissionDate.split("-").reverse().join("/")
       }).then(() => {
        history.push(routes.dashboard);
      });
    },
    [history, saveUser]
  );

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  useEffect(() => {
    setValue("cpf", formatCPF(cpfValue || ""));
  }, [cpfValue, setValue]);

  return (
    <>
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
          <TextField
            {...register("cpf", {
              required: "CPF obrigatório",
              validate: validateCPF,
              max: 14,
            })}
            id="cpf"
            placeholder="CPF"
            label="CPF"
            error={
              errors.cpf && errors.cpf.type === "validate"
                ? "CPF invalido"
                : errors.cpf?.message
            }
          />
          <TextField
            id="admissionDate"
            label="Data de admissão"
            type="date"
            {...register("admissionDate")}
          />
          <Button onClick={handleSubmit(openModal)}>Cadastrar</Button>
        </S.Card>
      </S.Container>
      <ConfirmModal
        isOpen={modal}
        message="Deseja mesmo adicionar o novo usuário?"
        onCancel={closeModal}
        onConfirm={() => onSubmit(watch())}
      />
    </>
  );
};

export default NewUserPage;
