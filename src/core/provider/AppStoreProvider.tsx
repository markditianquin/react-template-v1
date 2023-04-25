import { Provider } from "react-redux";
import { store } from "../../app/store/store.config";

interface OwnProps {
  children?: React.ReactNode;
}

export const AppStoreProvider: React.FC<OwnProps> = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};
