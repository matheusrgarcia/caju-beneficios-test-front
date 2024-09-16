import { FC, ReactNode } from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";
import { useHistory } from "react-router-dom";

import routes from "~/router/routes";

import errorStatusIcon from "./error-icon.svg";
import { Button } from "../buttons/button";

import * as S from "./index.styles";

export const ErrorBoundaryFallback: FC<FallbackProps> = () => {
  const history = useHistory();

  const handleClick = (): void => {
    if (history) {
      history.push(routes.dashboard);
    } else {
      window.location.pathname = routes.dashboard;
    }
  };

  return (
    <S.Container>
      <S.Info>
        <S.Icon src={errorStatusIcon} aria-hidden={true} />
        <S.Title>Erro inesperado</S.Title>
        <S.Description>
          Infelizmente um erro inesperado aconteceu. Você poderia voltar a tela
          inicial?
        </S.Description>
      </S.Info>

      <Button onClick={handleClick}>Voltar a página inicial</Button>
    </S.Container>
  );
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error, info: React.ErrorInfo) => void;
};

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  children,
  onError: userOnError,
}) => {
  const onError: ErrorBoundaryProps["onError"] = (error, info) => {
    console.error(error);
    userOnError?.(error, info);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
};
