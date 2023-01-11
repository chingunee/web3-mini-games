import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";

import CheckMetamask from "./components/CheckMetamask";
import CheckNetwork from "./components/CheckNetwork";

import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CheckMetamask>
      <CheckNetwork>
        <App />

        {/* <CheckOrganizer>
          <CheckModals>
            <CheckAlert>
              <App />
            </CheckAlert>
          </CheckModals>
        </CheckOrganizer> */}
      </CheckNetwork>
    </CheckMetamask>
  </Provider>
);
