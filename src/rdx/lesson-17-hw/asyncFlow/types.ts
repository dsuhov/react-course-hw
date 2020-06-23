export type ReqData = Record<string, any>;

export type ReqError = null | Error;

export type AFState = {
  isFetching: boolean;
  error: ReqError;
  data: ReqData;
};