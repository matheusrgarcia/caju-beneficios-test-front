import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";

import { Registration } from "~/modules/shared/types";
import { useModal } from "~/modules/shared/contexts/modal";

import { useDeleteRegistrationMutation } from "../../mutations/use-delete-registration-mutation";
import { RegistrationCardActions } from "./card-actions";

import * as S from "./styles";

type Props = {
  registration: Registration;
};

export const RegistrationCard: React.FC<Props> = ({ registration }) => {
  const { employeeName, email, admissionDate, id } = registration;

  const { openModal } = useModal();

  const deleteRegistration = useDeleteRegistrationMutation();

  const formattedAdmissionDate = dayjs(admissionDate).format("DD/MM/YYYY");

  const handleRegistrationDeletion = (): void => {
    deleteRegistration.mutate({
      id,
    })
  };

  const handleOpenModal = (): void => {
    openModal({
      title: "Exclusão de Registro",
      message: "Deseja realmente excluir este registro?",
      onConfirm: () => handleRegistrationDeletion(),
    });
  };

  return (
    <S.Card>
      <S.DeleteContainer>
        <Tooltip title="Excluir registro">
          <IconButton
            aria-label="Excluir registro"
            size="medium"
            onClick={handleOpenModal}
            draggable={false}
          >
            <HiOutlineTrash />
          </IconButton>
        </Tooltip>
      </S.DeleteContainer>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{formattedAdmissionDate}</span>
      </S.IconAndText>
      <RegistrationCardActions registration={registration} />
    </S.Card>
  );
};
