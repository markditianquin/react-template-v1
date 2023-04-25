import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxSampleState } from "../../actionTypes";
import { AppThunk, RootState } from "../../store.config";
import { GraphDataType } from "../../../interfaces/sample/ISample";
import { AxiosError } from "axios";
import { ISamplePageDataService } from "../../../interfaces/services/ISampleDataService";

const initalState: ReduxSampleState = {
  listItem: [],
  counter: 0,
  graphData: {
    displayName: "",
    jobTitle: "",
    mail: "",
    businessPhones: [],
    officeLocation: "",
  },
  status: "idle",
  error: null as any,
};

export const sampleSlice = createSlice({
  name: "sampleReducer",
  initialState: initalState,
  reducers: {
    increament: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    graphBegin: (state) => {
      state.status = "loading";
    },
    graphSuccess: (state, action: PayloadAction<GraphDataType>) => {
      state.status = "idle";
      state.graphData = action.payload;
    },
    graphFailure: (state, action: PayloadAction<AxiosError>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

// actions
export const {
  increament,
  decrement,
  incrementByAmount,
  graphBegin,
  graphFailure,
  graphSuccess,
} = sampleSlice.actions;

// selector
export const getCounterValue = (state: RootState) =>
  state.sampleReducer.counter;
export const getGraphValue = (state: RootState) =>
  state.sampleReducer.graphData;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = getCounterValue(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export const callGraph =
  (service: ISamplePageDataService): AppThunk =>
  async (dispatch, getState) => {
    dispatch(graphBegin);
    try {
      const response = await service.GetSampleData();
      dispatch(graphSuccess(response));
    } catch (error) {
      dispatch(graphFailure(error as any));
    }
  };

export const sampleReducer = sampleSlice.reducer;
