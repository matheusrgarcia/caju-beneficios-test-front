import * as React from "react";

import { ApplicationContainer } from "~/modules/shared/components";
import { NewRegistrationForm } from "../form";

const NewUserPage: React.FC = () => {
  return (
    <ApplicationContainer>
      <NewRegistrationForm />
    </ApplicationContainer>
  );
};

export default NewUserPage;
