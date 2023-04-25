import { GraphDataType } from "../sample/ISample";

export interface ISamplePageDataService {
  GetSampleData: () => Promise<GraphDataType>;
}
