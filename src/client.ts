import { ApolloClient, InMemoryCache } from "@apollo/client";

// Apollo client는 모든 곳에서 한 번만 선언
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
// cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
// apollo client 는 gql 의 결과를 InMemoryCache 에 저장하며,
// 이를 통해 클라이언트는 불필요한 네트워크 요청 없이 동일한 데이터에 대해 요청할 수 있다.

export default client;