import { FC, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../buttons/button";

import * as S from "./styles";

type Props = {
  hideBackButton?: boolean;
  onReturn?: () => void;
  children?: ReactNode;
};

type FooterFc = FC<Props> & { ContinueButton: typeof Button };

export const Footer: FooterFc = ({ onReturn, children }) => {
  const { goBack } = useHistory();

  const handleReturn = (): void => {
    const callback = onReturn || goBack;
    callback();
  };

  return (
    <S.BottomBar>
      <S.Content>
        <S.BackButton onClick={handleReturn}>Voltar</S.BackButton>
        {children}
      </S.Content>
    </S.BottomBar>
  );
};

Footer.ContinueButton = function FooterContinueButton({ ...props }) {
  return (
    <S.FooterButton
      data-testid="footer-continue-button"
      color="success"
      variant="contained"
      {...props}
    >
      Continuar
    </S.FooterButton>
  );
};
