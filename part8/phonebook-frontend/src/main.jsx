import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  ApolloProvider
} from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
