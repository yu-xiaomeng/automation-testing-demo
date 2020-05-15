import fetch from "node-fetch"
import  { ApolloClient } from "apollo-client"
import  { createHttpLink } from "apollo-link-http"
import  { InMemoryCache } from "apollo-cache-inmemory"
import  { baseUrl } from './baseurl'

const AuthToken = 'your token here'

const link = new createHttpLink({
    headers: {
      authentication: AuthToken
    },
    uri: baseUrl,
    fetch: fetch
  })
const cache = new InMemoryCache()

exports.client = new ApolloClient({
    link,
    cache
  })

