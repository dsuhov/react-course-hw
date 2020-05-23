import styled from "@emotion/styled";

export const AppWrapper = styled.div`
  font-family: sans-serif;
`;

export const Nav = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    margin-bottom: 20px;
  }
`;

export const NavItem = styled.li`
  padding: 2px 5px;
  list-style: none;
  border-left: 1px solid red;

  a {
    color: #333;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    border-right: 1px solid red;
    margin-right: 0;
  }

  button {
    cursor: pointer;
    color: #333;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    background: none;
    font-size: inherit;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;
