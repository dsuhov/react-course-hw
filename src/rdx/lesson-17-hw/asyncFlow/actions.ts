import { createAction } from "@reduxjs/toolkit";
import { ReqData } from "./types";
// Action creators

export const requestStart = createAction("REQUEST_START");

export const requestFailure = createAction<string>("REQUEST_FAILED");

export const requestSuccess = createAction<ReqData>("REQUEST_SUCCESS");
