import * as queries from "./queries";

export type difficultyType = "All" | "Easy" | "Medium" | "Hard";

/** "Internal Error" usually means the submission is still being judged */
export type submissionStatus =
  | "Accepted"
  | "Wrong Answer"
  | "Runtime Error"
  | "Time Limit Exceeded"
  | "Internal Error";

export interface LeetcodeBadge {
  id: string;
  displayName: string;
  /** URL to badge icon */
  icon: string;
  /** YYYY-MM-DD */
  creationDate: string;
}

export interface UserDetails {
  allQuestionsCount: Array<{
    difficulty: difficultyType;
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
        difficulty: difficultyType;
        count: number;
        submissions: number;
      }>;
      acSubmissionNum: Array<{
        difficulty: difficultyType;
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
    statusDisplay: submissionStatus;
    lang: string;
  }>;
}

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
