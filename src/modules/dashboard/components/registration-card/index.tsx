import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { IconButton } from "@mui/material";

import { Registration } from "../../constants";
import { useDeleteRegistrationMutation } from "../../mutations/use-delete-registration-mutation";
import { RegistrationCardActions } from "./card-actions";

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
      <S.Delete>
        <IconButton aria-label="delete" size="medium" onClick={handleRegistrationDeletion}>
          <HiOutlineTrash />
        </IconButton>
      </S.Delete>
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
