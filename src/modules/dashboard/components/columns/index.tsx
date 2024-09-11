import * as S from "./styles";
import RegistrationCard from "../../../../pages/Dashboard/components/RegistrationCard";
import {
  DashboardColumns,
  RegistrationStatus,
} from "~/modules/dashboard/constants";

// TODO: Maybe add INTL? Lets see if there's enough time to do this
const columnItems = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];

export const Collumns: React.FC<DashboardColumns> = ({ registrations }) => {
  return (
    <S.Container>
      {columnItems.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map((registration) => {
                  return (
                    <RegistrationCard
                      registration={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
