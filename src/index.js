import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider} from 'react-query';
import { store } from 'store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';


let persistor = persistStore(store);

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <div><Toaster position="top-right" reverseOrder={false}/></div>
    <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from={`/`} to="/admin/dashboard" />
          </Switch>
        </HashRouter>
      </PersistGate>
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
