import * as React from "react";

import { Columns } from "~/modules/dashboard/components/columns";
import { SearchBar } from "../../modules/dashboard/components/search-bar";
import { useGetRegistrationsQuery } from "~/modules/dashboard/queries/use-get-registrations-query";
import { GetRegistrationsResponse } from "~/modules/shared/types";

import * as S from './styles'

const DashboardPage: React.FC = () => {
  const { data: registrations } = useGetRegistrationsQuery();

  return (
    <S.Container>
      <SearchBar />
      <Columns registrations={registrations as GetRegistrationsResponse} />
    </S.Container>
  );
};
export default DashboardPage;
