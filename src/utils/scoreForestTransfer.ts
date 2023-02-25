export default (arr: StudentAPI.Score[]) => {
  const list: Array<
    StudentAPI.ScoreNodeInterface & {
      parent: string | null;
    }
  > = arr.map((item) => {
    const splitIndex = item.index.lastIndexOf("-");
    return {
      ...item,
      parent: item.index.substring(0, splitIndex) || null,
    };
  });

  list.forEach((node) => {
    if (node.parent) {
      const index = list.findIndex((item) => item.index === node.parent);
      if (index === -1) throw new Error("miss parent node!!");
      if (!list[index].list) list[index].list = [];
      list[index].list!.push(node); // insert by order
    }
  });

  return list.filter((item) => !item.parent);
};
