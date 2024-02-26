import { DifficultyLevel, ErrorResponse, LeetcodeAPIResponse } from "../util";
import * as queries from "./queries";

/**
 * Makes an asynchronous network request for a list of questions.
 */
export async function fetchQuestionList(
  skip: number,
  limit: number
): Promise<LeetcodeAPIResponse<any>> {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: queries.questionListQuery,
      variables: {
        categorySlug: "all-code-essentials",
        skip: skip,
        limit: limit,
        filters: {},
      },
    }),
  })
    .then(result => result.json())
    .then(result => result.data.problemsetQuestionList)
    .then(result => {
      if (result === null || result === undefined) {
        return {
          error: {
            message: `Error while fetching question list`,
          },
        } as ErrorResponse;
      }
      return result;
    })
    .catch(
      err =>
        ({
          error: {
            message: `Error while fetching question list`,
          },
        }) as ErrorResponse
    );

  return data;
}
