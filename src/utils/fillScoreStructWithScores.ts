import scoreForestTransfer from "./scoreForestTransfer";

const fillScoreStructWithScores = (
  struct: StudentAPI.ScoreNodeInterface[],
  scores: StudentAPI.Score[]
) => {
  const result = scoreForestTransfer(struct);
  let year = new Date().getFullYear();

  const scoresMap: {
    [key: string]: StudentAPI.Score;
  } = {};
  scores.forEach((item) => {
    scoresMap[item.index] = item;
  });

  const dfs = (node: StudentAPI.ScoreNodeInterface) => {
    if (node.list) {
      node.list.forEach((item) => {
        dfs(item);
      });
    } else {
      year = scoresMap[node.index]?.year || year;
      node.value = scoresMap[node.index]?.value;
      node.year = scoresMap[node.index]?.year || year;
    }
  };

  result.forEach((item) => dfs(item));
  return result;
};

export default fillScoreStructWithScores;
