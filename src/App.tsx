import "./App.css";
import { Provider } from "react-redux";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store/store";
import { AppRouter } from "./router";
const persistor = persistStore(store);

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </PersistGate>
  );
}

export default App;
