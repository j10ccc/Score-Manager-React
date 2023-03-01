import scoreColumnsTransfer from "./scoreColumnsTransfer";
import flattenScoresNodes from "./flattenScoresNodes";
import scoreForestTransfer from "./scoreForestTransfer";

export const fillScoreNodeData = (
  item: StudentAPI.ScoreNodeInterface
): number => {
  item.value = item.list?.reduce((prev, current) => {
    if (current.list === undefined) return prev + (current?.value || 0);
    else return prev + fillScoreNodeData(current);
  }, 0);
  return item.value || 0;
};

export const createGuid = () => {
  const s4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export { scoreColumnsTransfer, flattenScoresNodes, scoreForestTransfer };
