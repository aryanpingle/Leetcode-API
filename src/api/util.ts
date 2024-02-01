export type ErrorResponse = {
  error: { message: string; path?: Array<string> };
};

/** Fetch errors result in null, query errors result in a LeetcodeErrorResponse */
export type LeetcodeAPIResponse<K> = K | ErrorResponse;

export type DifficultyLevel = "All" | "Easy" | "Medium" | "Hard";

/** "Internal Error" usually means the submission is still being judged */
export type SubmissionStatus =
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

export function logThenReturn<T>(value: T): T {
  console.log(value);
  return value;
}
