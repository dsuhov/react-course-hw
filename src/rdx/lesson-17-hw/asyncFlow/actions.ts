import { createAction } from "@reduxjs/toolkit";
import { ReqError, ReqData } from "./types";
// Action creators

export const requestStart = createAction("REQUEST_START");

export const requestFailure = createAction<ReqError, "REQUEST_FAILED">(
  "REQUEST_FAILED"
);

export const requestSuccess = createAction<ReqData, "REQUEST_SUCCESS">(
  "REQUEST_SUCCESS"
);