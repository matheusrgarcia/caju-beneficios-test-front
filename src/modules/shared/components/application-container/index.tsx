import React from "react";

import * as S from "./styles";

type ApplicationContainerProps = {
  children: React.ReactNode;
};

export const ApplicationContainer: React.FC<ApplicationContainerProps> = ({
  children,
}) => {
  return <S.AppContainer>{children}</S.AppContainer>;
};
