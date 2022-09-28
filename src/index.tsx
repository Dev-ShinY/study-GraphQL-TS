import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import client from "./client";
import { ApolloProvider } from "@apollo/client"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* Provider는 기본적으로 애플리케이션 안에 모두가 이 client를 접근하게 해줌 */}
    <ApolloProvider client={ client }>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);