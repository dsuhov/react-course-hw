import styled from "@emotion/styled";
import { css } from "@emotion/core";

export const ControlsWrapper = styled.div`
  padding-top: 14px;
`;

export const ControlsLine = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Buttons = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const FieldSize = styled.div`
  margin-right: 20px;
`;

export const Label = styled.div`
  margin-bottom: 6px;
`;

export const StartBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    padding: 8px 12px;
    font-size: 1.1em;
    display: block;
    text-transform: uppercase;
    cursor: pointer;
    border: 2px solid #9eb7e5;
    border-radius: 4px;
    color: #304c89;
    background: #f2efe4;
    font-weight: 700;
    letter-spacing: 0.06em;

    &:hover {
      box-shadow: 0 0 6px #9eb7e5;
      background: #f6f5ea;
    }
  }
`;

export const NumberInput = styled.input`
  padding: 5px 10px;
  border: 2px solid #9eb7e5;
  border-radius: 4px;
  max-width: 80px;

  &:focus {
    outline: 1px solid #648de5;
    box-shadow: 0 0 5px #648de5;
  }
`;

export const Button = styled.button<{ disabled: boolean }>`
  display: block;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px 10px;
  border: 2px solid #9eb7e5;
  border-radius: 4px;
  color: #304c89;
  background: #f2efe4;
  font-weight: 700;
  letter-spacing: 0.06em;

  &:hover {
    box-shadow: 0 0 6px #9eb7e5;
    background: #f6f5ea;
  }

  ${({ disabled }) => {
    if (disabled) {
      return css`
        opacity: 0.6;
        pointer-events: none;
      `;
    }
  }}
`;
