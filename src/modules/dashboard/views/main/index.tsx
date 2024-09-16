import * as React from "react";

import { useGetRegistrationsQuery } from "~/modules/dashboard/queries/use-get-registrations-query";
import { GetRegistrationsResponse } from "~/modules/shared/types";
import { LayoutContainer } from "~/modules/shared/components";

import { SearchBar } from "../../components/search-bar";
import { RegistrationColumns } from "../../components/registration-columns";

const DashboardPage: React.FC = () => {
  const { data: registrations, isLoading } = useGetRegistrationsQuery();

  return (
    <LayoutContainer centralized>
      <LayoutContainer.Content>
        <SearchBar />
        <RegistrationColumns
          registrations={registrations as GetRegistrationsResponse}
          isLoading={isLoading}
        />
      </LayoutContainer.Content>
    </LayoutContainer>
  );
};
export default DashboardPage;
