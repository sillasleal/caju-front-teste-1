import styled, { keyframes, css } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

type HeaderProps = {
  loading?: boolean;
};

export const Header = styled.header<HeaderProps>`
  background: rgb(255, 117, 0);
  background: linear-gradient(
    258deg,
    rgba(255, 117, 0, 1) 8%,
    rgba(232, 5, 55, 1) 53%
  );
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0px 24px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    ${({ loading }) =>
      loading &&
      css`
        background: linear-gradient(90deg, transparent, #007bff, transparent);
        animation: ${loadingAnimation} 2s infinite;
      `}

  h1 {
    color: #fff;
    font-size: 24px;
  }
`;
