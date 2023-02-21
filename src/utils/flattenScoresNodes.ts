/**
 * @feature
 * 树状数组扁平化
 * 使用 dfs + closure
 */
const flattenScoresNodes = (forest: StudentAPI.ScoreNodeInterface[]) => {
  const result: StudentAPI.ScoreNodeInterface[] = [];

  const dfs = (node: StudentAPI.ScoreNodeInterface) => {
    if (node.list) {
      node.list.forEach((item) => dfs(item));
    } else {
      result.push(node);
    }
  };

  forest.forEach((node) => dfs(node));

  return result;
};

export default flattenScoresNodes;
