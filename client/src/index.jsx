import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './store/store';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';

import './index.scss';
import './index.less';
import { notification } from 'antd';
import { getStorage } from 'utils';

const httpLink = new HttpLink({ uri: 'http://localhost:8080' });
const authLink = setContext((_, { headers }) => {
  const authorization = getStorage('token');
  return {
    headers: {
      ...headers,
      authorization,
    }
  }
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    notification.error({ message: graphQLErrors.map(({ message }) => { return message }).join('<br />') });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
