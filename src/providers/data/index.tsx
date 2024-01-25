import graphqlDataProvider, { GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

// Setting up a graphQL client which will make requests to the API:
export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = API_BASE_URL + "/graphql";
// URL for WebSocket client:
export const WS_URL = "wss://api.crm.refine.dev/graphql";

export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch (error) {
      return Promise.reject(error as Error)
    }
  }
})

// WebSocket client that will provide live data changes to the app via the 'Refine' component in App.tsx:
export const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");

          return {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
      })
    : undefined;

// Data provider that makes requests to the api:
export const dataProvider = graphqlDataProvider(client);

// Live Provider that also makes a WebSocket request to the API:
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined;