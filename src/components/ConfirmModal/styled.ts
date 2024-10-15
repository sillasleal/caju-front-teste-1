import styled from "styled-components";
import Button from "../Buttons";

export const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalMessage = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ButtonCancel = styled(Button)`
    background-color: #f00;
`;
