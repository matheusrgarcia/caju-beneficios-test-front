import { Collumns } from "~/modules/dashboard/components/columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useGetRegistrationsQuery } from "~/modules/dashboard/queries/use-get-registrations-query";
import { GetRegistrationsResponse } from "~/modules/shared/types";
import * as React from "react";

const DashboardPage: React.FC = () => {
  const { data: registrations } = useGetRegistrationsQuery();

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations as GetRegistrationsResponse} />
    </S.Container>
  );
};
export default DashboardPage;
