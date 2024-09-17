import { FC, ReactNode } from "react";
import { useHistory } from "react-router-dom";

import * as S from "./styles";
import { LoadingButton } from "@mui/lab";

type Props = {
  hideBackButton?: boolean;
  onReturn?: () => void;
  children?: ReactNode;
};

type FooterFc = FC<Props> & { ContinueButton: typeof LoadingButton };

export const Footer: FooterFc = ({ onReturn, children }) => {
  const { goBack } = useHistory();

  const handleReturn = (): void => {
    const callback = onReturn || goBack;
    callback();
  };

  return (
    <S.BottomBar data-testid="footer">
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
      Salvar Registro
    </S.FooterButton>
  );
};
