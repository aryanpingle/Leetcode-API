import {
  DifficultyLevel,
  ErrorResponse,
  LeetcodeAPIResponse,
  LeetcodeBadge,
  SubmissionStatus,
} from "../util";
import * as queries from "./queries";

export interface UserProfile {
  allQuestionsCount: Array<{
    difficulty: DifficultyLevel;
    count: number;
  }>;
  matchedUser: {
    username: string;
    githubUrl: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
    contributions: {
      points: number;
      questionCount: number;
      testcaseCount: number;
    };
    profile: {
      realName: string;
      userAvatar: string;
      /** DD/MM/YYYY */
      birthday: string | null;
      ranking: number;
      reputation: number;
      websites: Array<string>;
      countryName: string | null;
      /** Current employer only */
      company: string;
      /** Chronologically latest education entry */
      school: string;
      skillTags: Array<string>;
      aboutMe: string;
      starRating: number;
    };
    badges: Array<LeetcodeBadge>;
    upcomingBadges: Array<{ name: string; icon: string }>;
    activeBadge: LeetcodeBadge | null;
    submitStats: {
      totalSubmissionNum: Array<{
        difficulty: DifficultyLevel;
        count: number;
        submissions: number;
      }>;
      acSubmissionNum: Array<{
        difficulty: DifficultyLevel;
        count: number;
        submissions: number;
      }>;
    };
    /** Every key is a UNIX timestamp in seconds */
    submissionCalendar: Record<string, number> | null;
  };
  recentSubmissionList: Array<{
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: SubmissionStatus;
    lang: string;
  }>;
  recentAcSubmissionList: Array<{
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: SubmissionStatus;
    lang: string;
  }>;
}

/**
 * Makes an asynchronous network request for the user's profile details.
 */
export async function fetchUserProfile(
  username: string
): Promise<LeetcodeAPIResponse<UserProfile>> {
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
    .then(result => {
      if ("errors" in result) {
        // Error in the query
        const errorResponse = {
          error: {
            message: result.errors.message,
          },
        } as ErrorResponse;

        if ("path" in result.errors) {
          errorResponse.error.path = result.errors.path;
        }

        return errorResponse;
      }

      return result.data as UserProfile;
    })
    .catch(
      err =>
        ({
          error: {
            message: `Error while fetching user profile ${username}`,
          },
        } as ErrorResponse)
    );

  return data;
}
