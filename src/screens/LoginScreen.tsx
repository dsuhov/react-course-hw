import React, { useState, useCallback, useEffect } from "react";
import { login, isLoggedIn } from "@/api/auth";
import { useHistory, Redirect } from "react-router-dom";
import styled from "@emotion/styled";

const From = styled.form`
  display: flex;
  justify-content: center;

  input {
    padding: 5px 10px;
    border: 2px solid #9eb7e5;
    border-right: none;
    border-radius: 4px 0 0 4px;

    &:focus {
      outline: 1px solid #648de5;
      box-shadow: 0 0 5px #648de5;
    }
  }

  button {
    text-transform: uppercase;
    cursor: pointer;
    padding: 5px 10px;
    border: 2px solid #9eb7e5;
    border-left: none;
    border-radius: 0 4px 4px 0;
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

enum AuthStatus {
  checking,
  authorized,
  notAuthorized,
}

export const LoginScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(AuthStatus.checking);
  const history = useHistory();

  const onSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      await login(name);
      history.push(`/game`);
    },
    [history, name]
  );

  useEffect(() => {
    (async () => {
      const isAuthorized = await isLoggedIn();
      if (isAuthorized) {
        setIsAuthorized(AuthStatus.authorized);
      } else {
        setIsAuthorized(AuthStatus.notAuthorized);
      }
    })();
  }, []);

  if (isAuthorized === AuthStatus.checking) {
    return <div>Checking if user is authorized</div>;
  }

  if (isAuthorized === AuthStatus.authorized) {
    return <Redirect to="/game" />;
  }

  return (
    <From onSubmit={onSubmit}>
      <label>
        Name:&nbsp;
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(ev) => setName((ev.target as HTMLInputElement).value)}
        />
      </label>
      <button>Login</button>
    </From>
  );
};
