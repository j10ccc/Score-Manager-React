declare namespace SquareAPI {
  interface Topic {
    type: "question" | "declare";
    id: string;
    time: string;
    userRole: "coach" | "student";
    title: string;
    content: string;
    commentList?: Comment[];
  }

  interface Comment {
    id: string;
    content: string;
    userRole: "coach" | "student";
    time: string;
  }

  interface GetTopicsData {
    page: number;
    size: number;
  }

  interface GetTopicsResult {
    code: number;
    msg: string;
    data: {
      list: Topic[];
      count: number;
    };
  }

  interface GetTopicDetailData {
    id: string;
  }

  interface GetTopicDetailResult {
    code: number;
    msg: string;
    data: {
      topic: Topic;
    };
  }

  interface CreateCommentData {
    content: string;
    target: string;
  }

  interface CreateCommentResult {
    code: number;
    msg: string;
    data: {
      id: string;
    };
  }

  interface CreateTopicData {
    type: "question" | "declare";
    userRole: string;
    content: string;
    title: string;
  }

  interface CreateTopicResult {
    code: number;
    msg: string;
    data: {
      id: string;
    };
  }
}
