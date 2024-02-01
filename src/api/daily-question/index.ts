import { LeetcodeQuestion } from "../question";
import { ErrorResponse, LeetcodeAPIResponse } from "../util";
import * as queries from "./queries";

export interface DailyLeetcodeQuestion {
  /** YYYY-MM-DD */
  date: string;
  /** Returns a link relative to leetcode.com */
  link: string;
  question: LeetcodeQuestion;
}

/**
 * Makes an asynchronous network request for Leetcode's current Daily Question.
 */
export async function fetchDailyQuestion(): Promise<
  LeetcodeAPIResponse<LeetcodeQuestion>
> {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: queries.dailyQuestionQuery,
      variables: {},
    }),
  })
    .then(result => result.json())
    .then(result => result.data.activeDailyCodingChallengeQuestion)
    .then(result => result)
    .catch(
      err =>
        ({
          error: {
            message: `Error while fetching daily question`,
          },
        } as ErrorResponse)
    );

  return data;
}
