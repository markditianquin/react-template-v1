import React from "react";
import { DataServiceContext } from "../../app/context/dataServiceContext";
import { SamplePageDataService } from "../../app/services/SampleFolder/SampleService";
import { msalInstance } from "../..";

interface OwnProps {
  children?: React.ReactNode;
}
export const AppDataServiceProvider: React.FC<OwnProps> = (props) => {
  const sampleDataService = new SamplePageDataService(msalInstance);
  return (
    <DataServiceContext.Provider value={{ sampleService: sampleDataService }}>
      {props?.children}
    </DataServiceContext.Provider>
  );
};
