import React from "react";
import { IDataServiceContext } from "../interfaces/context/IDataServiceContext";

export const DataServiceContext: React.Context<IDataServiceContext> =
  React.createContext<IDataServiceContext>({} as IDataServiceContext);
