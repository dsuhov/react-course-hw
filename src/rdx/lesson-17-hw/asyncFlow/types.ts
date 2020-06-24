export type ReqData = Record<string, string | number>;

export type AFState = {
  isFetching: boolean;
  error: string;
  data: ReqData;
};
