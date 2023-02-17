import { Editor } from "@bytemd/react";
import pluginGfm from "@bytemd/plugin-gfm";
import { useMemo } from "react";

type PropsType = {
  value: string;
  onChange: (value: string) => void;
};

const TopicEditorMd = (props: PropsType) => {
  const { value, onChange } = props;
  const plugins = useMemo(() => [pluginGfm()], []);

  return (
    <Editor
      locale={{
        bold: "粗体",
        italic: "斜体",
        link: "链接",
        quote: "引用",
        codeBlock: "代码片段",
        ul: "无序列表",
        fullscreen: "全屏",
        ol: "有序列表",
        sync: "滚动同步",
        top: "回到顶部",
        previewOnly: "仅预览",
        writeOnly: "仅书写",
        help: "语法帮助",
      }}
      placeholder="请输入正文内容"
      value={value || ""}
      plugins={plugins}
      onChange={onChange}
    />
  );
};

export default TopicEditorMd;
