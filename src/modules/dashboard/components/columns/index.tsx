import * as S from "./styles";
import RegistrationCard from "../registration-card";
import { dashboardColumnItems, DashboardColumns } from "../../constants";

export const Columns: React.FC<DashboardColumns> = ({ registrations }) => (
  <S.Container>
    {dashboardColumnItems.map((column) => {
      const filteredRegistrations = registrations?.filter(
        (registration) => registration.status === column.status
      );

      return (
        <S.Column status={column.status} key={column.title}>
          <S.TitleColumn status={column.status}>
            {column.title}
          </S.TitleColumn>
          <S.ColumnContent>
            {filteredRegistrations?.map((item) => (
              <RegistrationCard registration={item} key={item.id} />
            ))}
          </S.ColumnContent>
        </S.Column>
      );
    })}
  </S.Container>
);
