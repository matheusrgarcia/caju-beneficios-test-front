import { RegistrationStatus } from "~/modules/shared/constants";
import { Registration, RegistrationStatusKeys } from "~/modules/shared/types";

import { useUpdateRegistrationMutation } from "../../../mutations/use-update-registration-mutation";

import * as S from "./styles";
import { useModal } from "~/modules/shared/contexts";
import { dashboardStatusTitles } from "~/modules/dashboard/constants";

type Props = {
  registration: Registration;
};

export const RegistrationCardActions: React.FC<Props> = ({ registration }) => {
  const { id, status } = registration;

  const updateRegistration = useUpdateRegistrationMutation();
  const { openModal } = useModal();

  const formattedTitle = (status: RegistrationStatusKeys): string =>
    dashboardStatusTitles[status].toUpperCase();

  const updateRegistrationAction = (status: RegistrationStatusKeys): void => {
    updateRegistration.mutate({
      ...registration,
      id,
      status,
    });
  };

  const handleAction = (status: RegistrationStatusKeys): void => {
    openModal({
      title: "Confirmar status de registro",
      message: `Deseja realmente mudar o status deste registro para ${formattedTitle(
        status
      )}?`,
      onConfirm: () => updateRegistrationAction(status),
    });
  };

  const isInReview = status === RegistrationStatus.REVIEW;

  return (
    <S.Actions>
      {!isInReview && (
        <S.CustomButton
          draggable={false}
          variant="outlined"
          color="warning"
          size="small"
          onClick={() => handleAction(RegistrationStatus.REVIEW)}
        >
          Revisar novamente
        </S.CustomButton>
      )}

      {isInReview && (
        <S.CustomButton
          draggable={false}
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleAction(RegistrationStatus.REPROVED)}
        >
          Reprovar
        </S.CustomButton>
      )}
      {isInReview && (
        <S.CustomButton
          draggable={false}
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleAction(RegistrationStatus.APPROVED)}
        >
          Aprovar
        </S.CustomButton>
      )}
    </S.Actions>
  );
};
