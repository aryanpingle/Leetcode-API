export const userProfileQuery = `query getUserProfile($username: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $username) {
    username
    githubUrl
    twitterUrl
    linkedinUrl
    contributions { points questionCount testcaseCount }
    profile {
      realName
      userAvatar
      birthday
      ranking
      reputation
      websites
      countryName
      company
      school
      skillTags
      aboutMe
      starRating
    }
    badges { id displayName icon creationDate }
    upcomingBadges { name icon }
    activeBadge { id displayName icon creationDate }
    submitStats {
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    submissionCalendar
  }
  recentSubmissionList(username: $username, limit: 20) {
    title
    titleSlug
    timestamp
    statusDisplay
    lang
  }
}`;

export async function fetchUserProfile(username: string) {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: userProfileQuery,
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
