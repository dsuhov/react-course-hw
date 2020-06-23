/*

Курс React, урок 17: Middlewares

Домашнее задание 2
src/lesson17/homework/thunk.ts

Напишите свой thunk middleware и подключите в приложение

+1 балл за свой thunk middleware и подключение в приложение
+1 балл за тесты

*/
import { Middleware } from "redux";

export const myThunkMiddleware: Middleware = ({ dispatch }) => (
  next
) => (action) => {
  if (typeof action === "function") {
    console.log("It's a function action for thunk flow: ", action);
     action(dispatch);
     return next(action);
  }

  return next(action);
};
