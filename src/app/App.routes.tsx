import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { loginRequest } from "./authConfig";
import { ProfileContent } from "./page/samplePage/graph";
import { useAppDispatch } from "./hooks/reduxHelper";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";

export const ErrorComponent = (props: any) => {
  return <div>An Error Occurred</div>;
};

export const Loading = () => {
  return <div>Authentication in progress...</div>;
};

export function AppRoutes() {
  const reduxDispatch = useAppDispatch();
  const { instance, inProgress } = useMsal();
  const authRequest = {};

  // React.useEffect(() => {
  //   loadStartup();

  //   // eslint-disable-next-line
  // }, [reduxDispatch]);

  // const loadStartup = async () => {
  //   console.log("inprogress", inProgress);
  //   if (inProgress === InteractionStatus.None) {
  //     console.log("calling login");
  //     await instance.loginRedirect(loginRequest);
  //   }
  // };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={{ ...loginRequest }}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <Routes>
        <Route path="/profile" element={<ProfileContent />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MsalAuthenticationTemplate>
  );
}
