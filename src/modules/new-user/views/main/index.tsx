import * as React from "react";
import { NewRegistrationForm } from "../form";
import { Container } from "~/modules/shared/components/container";

const NewUserPage: React.FC = () => {
  return (
    <Container>
      <NewRegistrationForm />
    </Container>
  );
};

export default NewUserPage;
