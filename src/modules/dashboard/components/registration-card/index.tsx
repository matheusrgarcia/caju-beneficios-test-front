import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { IconButton, Tooltip } from "@mui/material";

import { useDeleteRegistrationMutation } from "../../mutations/use-delete-registration-mutation";
import { RegistrationCardActions } from "./card-actions";
import { Registration } from "~/modules/shared/constants";

type Props = {
  registration: Registration;
};

const RegistrationCard: React.FC<Props> = ({ registration }) => {
  const { employeeName, email, admissionDate, id } = registration;

  const deleteRegistration = useDeleteRegistrationMutation();

  const handleRegistrationDeletion = (): void => {
    deleteRegistration.mutate({
      id,
    });
  };

  return (
    <S.Card>
      <S.DeleteContainer>
        <Tooltip title="Excluir registro">
          <IconButton
            aria-label="Excluir registro"
            size="medium"
            onClick={handleRegistrationDeletion}
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
        <span>{admissionDate}</span>
      </S.IconAndText>
      <RegistrationCardActions registration={registration} />
    </S.Card>
  );
};

export default RegistrationCard;
