import * as S from "../styles";

import { Button } from "~/modules/shared/components/buttons/button";
import {
  Registration,
  RegistrationStatus,
  RegistrationStatusKeys,
} from "~/modules/shared/constants";

import { useUpdateRegistrationMutation } from "../../../mutations/use-update-registration-mutation";

type Props = {
  registration: Registration;
};

export const RegistrationCardActions: React.FC<Props> = ({ registration }) => {
  const { id, status } = registration;

  const updateRegistration = useUpdateRegistrationMutation();

  const handleAction = (status: RegistrationStatusKeys): void => {
    updateRegistration.mutate({
      ...registration,
      id,
      status,
    });
  };

  const isInReview = status !== RegistrationStatus.REVIEW;
  const isReproved = status !== RegistrationStatus.REPROVED;
  const isApproved = status !== RegistrationStatus.APPROVED;

  return (
    <S.Actions>
      {isInReview && (
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={() => handleAction(RegistrationStatus.REVIEW)}
        >
          Revisar novamente
        </Button>
      )}

      {isReproved && (
        <Button
          variant="contained"
          color="error"
          size="medium"
          onClick={() => handleAction(RegistrationStatus.REPROVED)}
        >
          Reprovar
        </Button>
      )}
      {isApproved && (
        <Button
          variant="contained"
          color="success"
          size="medium"
          onClick={() => handleAction(RegistrationStatus.APPROVED)}
        >
          Aprovar
        </Button>
      )}
    </S.Actions>
  );
};
