import { PublicClientApplication } from "@azure/msal-browser";
import { appConfig } from "../../App.config";
import { loginRequest } from "../../authConfig";
import { GraphDataType } from "../../interfaces/sample/ISample";
import { ISamplePageDataService } from "../../interfaces/services/ISampleDataService";
import { HttpClient } from "../../utils/axios.helper";

export class SamplePageDataService implements ISamplePageDataService {
  private baseUrl: string;
  private resourceScope: string[];
  private authClient: PublicClientApplication;

  public constructor(msalInstance: PublicClientApplication) {
    this.baseUrl = appConfig.appConfig.baseUrl;
    this.resourceScope = loginRequest.scopes;
    this.authClient = msalInstance;
  }
  public async GetSampleData(): Promise<GraphDataType> {
    return new Promise((resolve, reject): void => {
      HttpClient.apiCall(
        this.baseUrl,
        undefined,
        this.authClient,
        this.resourceScope,
        "GET"
      ).then((response) => {
        resolve(response.data);
      });
    });
  }
}
