import React from "react";
import { AppWrapper, NavItem, Nav } from "@/App.styled";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { GameScreen } from "@/screens/GameScreen";
import { LoginScreen } from "@/screens/LoginScreen";
import { Provider } from "react-redux";
import { store } from "@/rdx/store";

export const App: React.FC<{}> = () => (
  <Provider store={store}>
    <Router>
      <AppWrapper>
        <Nav>
          <ul>
            <NavItem>
              <NavLink to="/game" activeStyle={{ textDecoration: "underline" }}>
                Game
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/login"
                activeStyle={{ textDecoration: "underline" }}
              >
                Login
              </NavLink>
            </NavItem>
          </ul>
        </Nav>
        <Switch>
          <Route path="/game" component={GameScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/*" component={LoginScreen} />
        </Switch>
      </AppWrapper>
    </Router>
  </Provider>
);
