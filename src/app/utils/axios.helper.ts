import { PublicClientApplication } from "@azure/msal-browser";
import axios, {
  CancelToken,
  Method,
  ResponseType as AxiosResponseType,
} from "axios";
import { loginRequest } from "../authConfig";

const instance = axios.create();

export const HttpClient = {
  apiCall: async (
    baseUrl: string,
    apiEndPoint: string | undefined,
    msalInstance: PublicClientApplication,
    resourceScope: string[],
    method: Method,
    data?: any,
    params?: any,
    cancelToken?: CancelToken,
    responseType?: AxiosResponseType,
    additionHeaders?: any
  ) => {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw Error(
        "No active account! Verify a user has been signed in and setActiveAccount has been called."
      );
    }

    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });
    const bearer = `Bearer ${response.accessToken}`;

    return instance({
      method: method,
      baseURL: baseUrl,
      url: apiEndPoint,
      headers: {
        "Content-Type": "application/json: charset=utf-8",
        "x-content-type-options": "nonsniff",
        Authorization: bearer,
        ...additionHeaders,
      },
      data: data,
      params: params,
      cancelToken: cancelToken,
      responseType: responseType,
    });
  },
};
