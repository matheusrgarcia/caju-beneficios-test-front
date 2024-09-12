import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Button, IconButton } from "@mui/material";
import { useUpdateRegistrationMutation } from "../../mutations/use-update-registration-mutation";
import {
  Registration,
  RegistrationStatus,
  RegistrationStatusKeys,
} from "../../constants";
import { useDeleteRegistrationMutation } from "../../mutations/use-delete-registration-mutation";

type Props = {
  registration: Registration;
};

const RegistrationCard: React.FC<Props> = ({ registration }) => {
  const { employeeName, email, admissionDate, id } = registration;

  const updateRegistration = useUpdateRegistrationMutation();
  const deleteRegistration = useDeleteRegistrationMutation();

  const handleAction = (status: RegistrationStatusKeys) => {
    updateRegistration.mutate({
      ...registration,
      id,
      status,
    });
  };

  const handleDeletion = () => {
    deleteRegistration.mutate({
      id,
    });
  };

  return (
    <S.Card>
      <S.Delete>
        <IconButton aria-label="delete" size="medium" onClick={handleDeletion}>
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
      <S.Actions>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={() => handleAction(RegistrationStatus.REVIEW)}
        >
          Revisar novamente
        </Button>
        <Button
          variant="contained"
          color="success"
          size="medium"
          onClick={() => handleAction(RegistrationStatus.APPROVED)}
        >
          Aprovar
        </Button>
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={() => handleAction(RegistrationStatus.REPROVED)}
        >
          Reprovar
        </Button>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
