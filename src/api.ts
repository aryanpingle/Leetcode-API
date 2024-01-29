import * as queries from "./queries";

export interface UserDetails {}

export async function fetchUserProfile(username: string) {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: queries.userProfileQuery,
      variables: {
        username: username,
      },
    }),
  })
    .then(result => result.json())
    .catch(err => {
      console.error("Error:", err);
      return { error: err };
    });

  return data;
}
