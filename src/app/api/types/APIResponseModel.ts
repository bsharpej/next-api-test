export type APIResponseModel<ResultType> = {
  status: number;
  statustext: string;
  message: string;
  data: ResultType;
};
