import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import VueApollo from 'vue-apollo'

// Graphql link
const httpLink = new HttpLink({
    uri: 'https://api.spacex.land/graphql'
})

// Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

// install the vue plugin
Vue.use(VueApollo)

export const apolloClient = new ApolloClient({
    link: errorLink.concat(httpLink),
    connectToDevTools: true,
    cache: new InMemoryCache()
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})