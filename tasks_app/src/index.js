import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { useAuth0 } from "@auth0/auth0-spa-js";


// Create a WebSocket link:
const link = new HttpLink({
  uri: "http://ec2-13-49-27-116.eu-north-1.compute.amazonaws.com/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "content-type":"application/json"
      }
    }
  }
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});

client.query({
    query: gql`
      query GetTasksData {
        tasks {
          id
          updated_at
          title
          checked
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  
  (
    <React.StrictMode>
    <ApolloProvider client={client}> 
        <App />
    </ApolloProvider>
    </React.StrictMode>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
