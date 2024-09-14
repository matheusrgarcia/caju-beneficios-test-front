import * as React from "react";

import { useGetRegistrationsQuery } from "~/modules/dashboard/queries/use-get-registrations-query";
import { GetRegistrationsResponse } from "~/modules/shared/types";
import { Container } from "~/modules/shared/components/container";

import { SearchBar } from "../../components/search-bar";
import { RegistrationColumns } from "../../components/registration-columns";

const DashboardPage: React.FC = () => {
  const { data: registrations } = useGetRegistrationsQuery();

  return (
    <Container>
      <SearchBar />
      <RegistrationColumns
        registrations={registrations as GetRegistrationsResponse}
      />
    </Container>
  );
};
export default DashboardPage;
