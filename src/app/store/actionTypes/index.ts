import { AxiosError } from "axios";
import { GraphDataType } from "../../interfaces/sample/ISample";

export interface ReduxSampleState {
  listItem: string[];
  counter: number;
  graphData: GraphDataType;
  status: "idle" | "loading" | "failed";
  error: AxiosError
}
