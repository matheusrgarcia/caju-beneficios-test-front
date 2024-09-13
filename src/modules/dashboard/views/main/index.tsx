import * as React from "react";

import { Columns } from "~/modules/dashboard/components/columns";
import { SearchBar } from "../../components/search-bar";
import { useGetRegistrationsQuery } from "~/modules/dashboard/queries/use-get-registrations-query";
import { GetRegistrationsResponse } from "~/modules/shared/types";

import { Container } from "~/modules/shared/components/container";

const DashboardPage: React.FC = () => {
  const { data: registrations } = useGetRegistrationsQuery();

  return (
    <Container>
      <SearchBar />
      <Columns registrations={registrations as GetRegistrationsResponse} />
    </Container>
  );
};
export default DashboardPage;
