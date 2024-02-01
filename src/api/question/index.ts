import { DifficultyLevel, ErrorResponse, LeetcodeAPIResponse } from "../util";
import * as queries from "./queries";

export interface LeetcodeQuestion {
  questionId: string;
  questionFrontendId: string;
  /** TODO: confirm type */
  boundTopicId: any;
  title: string;
  titleSlug: string;
  content: string;
  /** TODO: confirm type */
  translatedTitle: string | null;
  /** TODO: confirm type */
  translatedContent: string | null;
  isPaidOnly: boolean;
  difficulty: DifficultyLevel;
  likes: number;
  dislikes: number;
  /** isLiked will be null unless the API caller is logged in */
  isLiked: boolean | null;
  similarQuestions: Array<{
    title: string;
    titleSlug: string;
    difficulty: DifficultyLevel;
    /** TODO: confirm type */
    translatedTitle: string | null;
  }>;
  /**
   * TODO: confirm type.
   *
   * Each input in each testcase is joined by a newline (\n).
   * String inputs are wrapped in double quotation marks (").
   * Each testcase is joined by a newline (\n).
   */
  exampleTestcases: string | null;
  contributors: Array<{
    username: string;
    profileUrl: string;
    avatarUrl: string;
  }>;
  topicTags: Array<{
    name: string;
    slug: any;
    /** TODO: confirm type */
    translatedName: string | null;
  }>;
  /** TODO: confirm type */
  companyTagStats: any;
  codeSnippets: Array<{
    lang: string;
    langSlug: string;
    code: string;
  }> | null;
  /**
   * Interestingly, stats is a "JSONString".
   * @example
   * {
   *   totalAccepted: string;
   *   totalAcceptedRaw: number;
   *   totalSubmission: string;
   *   totalSubmissionRaw: number;
   *   acRate: string;
   * }
   */
  stats: string | null;
  hints: Array<string>;
  solution: {
    id: string;
    canSeeDetail: boolean;
    paidOnly: boolean;
    hasVideoSolution: boolean;
    paidOnlyVideo: boolean;
  };
  /** TODO: confirm type */
  status: any;
  /**
   * Each input in the testcase is joined by a newline (\n).
   * String inputs are wrapped in double quotation marks (").
   */
  sampleTestCase: string;
  /** Different for every question */
  metaData: string;
  judgerAvailable: boolean;
  /** TODO: find all possible values */
  judgeType: "large" | string;
  /** TODO: confirm type */
  mysqlSchemas: Array<any>;
  enableRunCode: boolean;
  enableTestMode: boolean;
  enableDebugger: boolean;
  envInfo: string;
  /** TODO: confirm type */
  libraryUrl: any;
  /** TODO: confirm type */
  adminUrl: any;
  challengeQuestion: {
    /** TODO: confirm type */
    id: any;
    /** TODO: confirm type */
    date: any;
    /** TODO: confirm type */
    incompleteChallengeCount: any;
    /** TODO: confirm type */
    streakCount: any;
    /** TODO: confirm type */
    type: any;
  };
  /** TODO: confirm type */
  note: any;
}

/**
 * Makes an asynchronous network request for the given question.
 * @param titleSlug The URL portion of a question, like "add-two-numbers"
 */
export async function fetchQuestion(
  titleSlug: string
): Promise<LeetcodeAPIResponse<LeetcodeQuestion>> {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: queries.questionQuery,
      variables: {
        titleSlug: titleSlug,
      },
    }),
  })
    .then(result => result.json())
    .then(result => result.data.question)
    .then(result => {
      if (result === null || result === undefined) {
        return {
          error: {
            message: `Question '${titleSlug}' does not exist`,
          },
        } as ErrorResponse;
      }
      return result;
    })
    .catch(
      err =>
        ({
          error: {
            message: `Error while fetching question '${titleSlug}'`,
          },
        }) as ErrorResponse
    );

  return data;
}
