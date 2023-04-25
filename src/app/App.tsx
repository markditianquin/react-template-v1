import "./App.css";
import { useNavigate } from "react-router-dom";
import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";
import { AppRoutes } from "./App.routes";

type AppProps = {
  pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <AppRoutes />
    </MsalProvider>
  );
}

/*
function App() {
  const reduxDispatch = useAppDispatch();
  const count = useAppSelector(getCounterValue);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {count}
        </a>
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
      </header>
    </div>
  );
}*/

export default App;
