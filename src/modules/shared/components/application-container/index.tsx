import { FC, ReactNode } from "react";
import { Footer } from "./application-footer";
import { Content } from "./application-content";

import * as S from "./styles";
import { AlertDialog } from "../alert-dialog";
import { Snackbar } from "../snackbar";

type Props = {
  children: ReactNode;
  centralized?: boolean;
};

type LayoutContainerComponent = FC<Props> & {
  Footer: typeof Footer;
  Content: typeof Content;
};

export const LayoutContainer: LayoutContainerComponent = ({
  children,
  centralized,
}) => {
  return (
    <S.AppContainer $centralized={centralized}>
      {children}
      <AlertDialog />
      <Snackbar />
    </S.AppContainer>
  );
};

LayoutContainer.Footer = Footer;
LayoutContainer.Content = Content;
