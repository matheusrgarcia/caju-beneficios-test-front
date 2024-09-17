import styled from "styled-components";
import tokens from "../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 660px;
  margin: 0 auto;
  gap: ${tokens.space.large};
  height: 100vh;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${tokens.space.huge} ${tokens.space.regular};
  background-color: ${tokens.colors.grayLight};
  border-radius: ${tokens.radii.m};
  position: relative;

  @media (min-width: ${tokens.breakpoints.l}) {
    padding: ${tokens.space.huge} ${tokens.space.loose};
  }

  ${tokens.mediaQueries.s} {
    margin: ${tokens.space.small};
  }
`;

export const Icon = styled.img`
  position: absolute;
  width: 50px;
  transform: translateY(-65px);

  ${tokens.mediaQueries.s} {
    width: 80px;
    transform: translateY(-100%);
  }
`;

export const Title = styled.h1`
  margin-bottom: ${tokens.space.huge};
  color: ${tokens.colors.black};
  font-weight: ${tokens.fontWeights.bold};
  font-size: ${tokens.fontSizes.l};
`;

export const Description = styled.p`
  font-size: ${tokens.fontSizes.m};
  text-align: center;
`;
