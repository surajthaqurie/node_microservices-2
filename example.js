const roundScoresObj = {
  1: {
    round: 1,
    scores: {
      1: 4, // userId: point
      2: 4,
      3: 1,
      4: 8,
    },
  },
  2: {
    round: 2,
    scores: {
      1: -2,
      2: -2,
      3: 1,
      4: 3,
    },
  },
  3: {
    round: 2,
    scores: {
      1: -2,
      2: -2,
      3: 1,
      4: -2,
    },
  },
  4: {
    round: 2,
    scores: {
      1: -2,
      2: -2,
      3: 1,
      4: -2,
    },
  },
  5: {
    round: 2,
    scores: {
      1: -2,
      2: -2,
      3: 1,
      4: -2,
    },
  },
};

const getPoints = (userId) => {
  let point = 0;
  for (let round in roundScoresObj) {
    let scores = roundScoresObj[round].scores;
    if (scores.hasOwnProperty(userId)) {
      point += scores[userId];
    }
  }
  return point;
};

const userIds = [1, 2, 3, 4];

let points = [];

for (let user of userIds) {
  const totalPoint = getPoints(user);
  points.push({ user, totalPoint });
}

points.sort((a, b) => b.totalPoint - a.totalPoint);

let winner = [];
var rank = 0;

points.forEach(function (point, index) {
  if (index === 0 || points[index - 1].totalPoint !== point.totalPoint) {
    rank++;
  }
  winner.push({ rank: rank, userId: point.user, point: point.totalPoint });
});

console.log("🚀 ~ points.forEach ~ winner:", winner);
