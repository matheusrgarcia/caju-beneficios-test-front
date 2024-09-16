import * as React from "react";

import { useGetRegistrationsQuery } from "~/modules/dashboard/queries/use-get-registrations-query";
import { GetRegistrationsResponse } from "~/modules/shared/types";
import { ApplicationContainer } from "~/modules/shared/components";

import { SearchBar } from "../../components/search-bar";
import { RegistrationColumns } from "../../components/registration-columns";

const DashboardPage: React.FC = () => {
  const { data: registrations, isLoading } = useGetRegistrationsQuery();

  return (
    <ApplicationContainer>
      <SearchBar />
      <RegistrationColumns
        registrations={registrations as GetRegistrationsResponse}
        isLoading={isLoading}
      />
    </ApplicationContainer>
  );
};
export default DashboardPage;
