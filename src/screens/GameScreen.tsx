import React, { useCallback } from "react";
import { GOLBoard } from "@/components";
import { authorizedOnlyHoc } from "@/utils/authorizedOnlyHOC";
import { logout, readLogin } from "@/api/auth";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

const HelloLine = styled.div`
  margin-bottom: 20px;
  text-align: center;

  span {
    font-weight: bold;
  }
`;

const LogoutBtn = styled.button`
  cursor: pointer;
  color: #333;
  border: none;
  background: none;
  font-size: inherit;
  padding: 0 5px;

  &:hover {
    color: red;
  }
`;

LogoutBtn.displayName = "LogoutBtn";
HelloLine.displayName = "HelloLine";

export const GameScreen = authorizedOnlyHoc(() => {
  const name = readLogin();
  const history = useHistory();

  const logoutHandler = useCallback(async () => {
    await logout();
    history.replace(`/`);
  }, []);

  return (
    <>
      <HelloLine>
        Hello, <span>{name}</span>!
        <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
      </HelloLine>
      <GOLBoard />
    </>
  );
});
