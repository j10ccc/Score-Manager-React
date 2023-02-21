const scoreColumsTransfer = (node: StudentAPI.ScoreNodeInterface) => {
  const result: any = { title: node.label };
  if (node.list) {
    result.children = node.list.map((subNode) => scoreColumsTransfer(subNode));
  } else {
    result.dataIndex = node.index;
    result.width = 150;
  }
  return result;
};

export default scoreColumsTransfer;
