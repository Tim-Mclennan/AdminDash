import { GraphQLFormattedError } from "graphql";

type Error = {
  message: string;
  statusCode: string;
};

// Sends a request to a given URL with specific options.
const customFetch = async (url: string, options: RequestInit) => {
  // retrieves the access token to set it in the authorisation header (check line 18)
  const accessToken = localStorage.getItem("access_token");
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      // gets rid of CORS issues:
      "Apollo-Require-Preflight": "true",
    },
  });
};

// this function  wraps around the `customFetch` function - It sends a request using `customFetch`, clones the response, 
// attempts to parse the body as JSON, checks for any GraphQL errors in the parsed body, and throws an error if found.
// If no errors are found, it returns the original response.
export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  const responseClone = response.clone();
  const body = await responseClone.json();
  const error = getGraphQLErrors(body);

  if (error) {
    throw error;
  }

  return response;
};

const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>,
): Error | null => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body?.errors;
    const messages = errors?.map((error) => error?.message)?.join("");
    const code = errors?.[0]?.extensions?.code;

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
    };
  }

  return null;
};