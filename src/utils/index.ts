export const fillScoreNodeData = (
  item: StudentAPI.ScoreNodeInterface
): number => {
  item.value = item.list?.reduce((prev, current) => {
    if (current.value !== undefined) return prev + current.value;
    else return prev + fillScoreNodeData(current);
  }, 0);
  return item.value || 0;
};
