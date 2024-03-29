/**
 * Auto-generated by rollup
 */

"use strict";

var express = require("express");

const userProfileQuery = `query getUserProfile($username: String!) {
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
  recentAcSubmissionList(username: $username, limit: 20) {
    title
    titleSlug
    timestamp
    statusDisplay
    lang
  }
}`;

/**
 * Makes an asynchronous network request for the user's profile details.
 */
async function fetchUserProfile(username) {
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
    .then(result => {
      if ("errors" in result) {
        // Error in the query
        const errorResponse = {
          error: {
            message: result.errors.message,
          },
        };
        if ("path" in result.errors) {
          errorResponse.error.path = result.errors.path;
        }
        return errorResponse;
      }
      return result.data;
    })
    .catch(err => ({
      error: {
        message: `Error while fetching user profile ${username}`,
      },
    }));
  return data;
}

const questionQuery = `query getQuestion($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    boundTopicId
    title
    titleSlug
    content
    translatedTitle
    translatedContent
    isPaidOnly
    difficulty
    likes
    dislikes
    isLiked
    similarQuestions
    exampleTestcases
    contributors {
      username
      profileUrl
      avatarUrl
    }
    topicTags {
      name
      slug
      translatedName
    }
    companyTagStats
    codeSnippets {
      lang
      langSlug
      code
    }
    stats
    hints
    solution {
      id
      canSeeDetail
      paidOnly
      hasVideoSolution
      paidOnlyVideo
    }
    status
    sampleTestCase
    metaData
    judgerAvailable
    judgeType
    mysqlSchemas
    enableRunCode
    enableTestMode
    enableDebugger
    envInfo
    libraryUrl
    adminUrl
    challengeQuestion {
      id
      date
      incompleteChallengeCount
      streakCount
      type
    }
    note
  }
}`;

/**
 * Makes an asynchronous network request for the given question.
 * @param titleSlug The URL portion of a question, like "add-two-numbers"
 */
async function fetchQuestion(titleSlug) {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: questionQuery,
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
        };
      }
      return result;
    })
    .catch(err => ({
      error: {
        message: `Error while fetching question '${titleSlug}'`,
      },
    }));
  return data;
}

const dailyQuestionQuery = `query getDailyQuestion {
  activeDailyCodingChallengeQuestion {
    date
    link
    question {
      questionId
      questionFrontendId
      boundTopicId
      title
      titleSlug
      content
      translatedTitle
      translatedContent
      isPaidOnly
      difficulty
      likes
      dislikes
      isLiked
      similarQuestions
      exampleTestcases
      contributors {
        username
        profileUrl
        avatarUrl
      }
      topicTags {
        name
        slug
        translatedName
      }
      companyTagStats
      codeSnippets {
        lang
        langSlug
        code
      }
      stats
      hints
      solution {
        id
        canSeeDetail
        paidOnly
        hasVideoSolution
        paidOnlyVideo
      }
      status
      sampleTestCase
      metaData
      judgerAvailable
      judgeType
      mysqlSchemas
      enableRunCode
      enableTestMode
      enableDebugger
      envInfo
      libraryUrl
      adminUrl
      challengeQuestion {
        id
        date
        incompleteChallengeCount
        streakCount
        type
      }
      note
    }
  }
}`;

/**
 * Makes an asynchronous network request for Leetcode's current Daily Question.
 */
async function fetchDailyQuestion() {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: dailyQuestionQuery,
      variables: {},
    }),
  })
    .then(result => result.json())
    .then(result => result.data.activeDailyCodingChallengeQuestion)
    .then(result => result)
    .catch(err => ({
      error: {
        message: `Error while fetching daily question`,
      },
    }));
  return data;
}

const questionListQuery = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
      total: totalNum
      questions: data {
      acRate
      difficulty
      freqBar
      frontendQuestionId: questionFrontendId
      isFavor
      paidOnly: isPaidOnly
      status
      title
      titleSlug
      topicTags {
        name
        id
        slug
      }
      hasSolution
      hasVideoSolution
    }
  }
}`;

/**
 * Makes an asynchronous network request for a list of questions.
 */
async function fetchQuestionList(skip, limit) {
  const data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrer: "https://leetcode.com",
    body: JSON.stringify({
      query: questionListQuery,
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
        };
      }
      return result;
    })
    .catch(err => ({
      error: {
        message: `Error while fetching question list`,
      },
    }));
  return data;
}

const homepageRH = (req, res) => {
  res.json("Hello! I'm Emu Otori ^-^");
};
const userProfileRH = async (req, res) => {
  const username = req.params["username"];
  if (!username) {
    res.json({ error: `No username provided` });
    return;
  }
  fetchUserProfile(username).then(data => res.json(data));
};
const questionRH = async (req, res) => {
  const titleSlug = req.params["titleSlug"];
  if (!titleSlug) {
    res.json({ error: `No titleSlug provided` });
    return;
  }
  fetchQuestion(titleSlug).then(data => res.json(data));
};
const dailyQuestionRH = async (req, res) => {
  fetchDailyQuestion().then(data => res.json(data));
};
const questionListRH = async (req, res) => {
  try {
    let skip = parseInt(req.params["skip"]);
    let limit = parseInt(req.params["limit"]);
    fetchQuestionList(skip, limit).then(data => res.json(data));
  } catch (e) {
    res.json({ error: `Invalid invokation, use /?skip=<int>&limit=<int>` });
  }
};

const app = express();
const port = 5500;
// source: https://stackoverflow.com/a/18311469/8089674
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "false");
  // Pass to next layer of middleware
  next();
});
app.get("/$", homepageRH);
app.get("/user/:username/$", userProfileRH);
app.get("/question/:titleSlug/$", questionRH);
app.get("/daily/$", dailyQuestionRH);
app.get("/question-list/:skip/:limit/", questionListRH);
//get user profile details
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
