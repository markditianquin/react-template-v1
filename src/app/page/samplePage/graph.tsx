import React from "react";
import { useMsal } from "@azure/msal-react";
import { GraphDataType } from "../../interfaces/sample/ISample";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHelper";
import {
  callGraph,
  decrement,
  getCounterValue,
  getGraphValue,
  increament,
} from "../../store/reducers/SampleReducer/sample.reducer";
import { DataServiceContext } from "../../context/dataServiceContext";

export const ProfileData: React.FC<{ graphData: GraphDataType }> = ({
  graphData,
}) => {
  const reduxDispatch = useAppDispatch();

  const count = useAppSelector(getCounterValue);
  return (
    <div id="profile-div">
      <p>
        <strong>Name: </strong> {graphData.displayName}
      </p>
      <p>
        <strong>Mail: </strong> {graphData.mail}
      </p>
      <p>
        <strong>Phone: </strong> {graphData.businessPhones[0]}
      </p>
      <p>
        <strong>Location: </strong> {graphData.officeLocation}
      </p>
      <p>
        <strong>Count: </strong> {count}
      </p>
      <button
        onClick={() => {
          reduxDispatch(increament());
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          reduxDispatch(decrement());
        }}
      >
        Subtract
      </button>
    </div>
  );
};

export const ProfileContent = () => {
  const reduxDispatch = useAppDispatch();

  const { sampleService } = React.useContext(DataServiceContext);
  const graphData = useAppSelector(getGraphValue);

  React.useEffect(() => {
    reduxDispatch(callGraph(sampleService));
  }, [reduxDispatch]);

  return <div>{graphData ? <ProfileData graphData={graphData} /> : null}</div>;
};
