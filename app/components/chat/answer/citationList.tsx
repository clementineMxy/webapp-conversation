import React, { Fragment } from "react";
import { Markdown } from "@/app/components/base/markdown";
import { CitationItem } from "@/types/app";
import { Tooltip } from "react-tooltip";

type CitationListProps = {
  citation: CitationItem[];
};

const CitationList: React.FC<CitationListProps> = ({ citation }) => {
  const jumpToMBFDocs = (item: CitationItem) => {
    // 知识库名：格式为MBF-guide
    // 文档名：格式为boilerplate.md
    // 对应跳转的链接为：https://mbf.tuhuyun.cn/guide/boilerplate.html
    const { dataset_name, document_name, content } = item;
    const dataset = dataset_name.split("-")[1];
    const document = document_name.replace(".md", ".html");
    let titleText = "";
    const matches = content
      .match(/^(#{1,6})\s+(.*)$/gm)
      ?.map((match) => match.trim().replaceAll("\n", ""));
    if (matches) {
      const maxLevel = Math.max(
        ...matches.map((match) => match.split(" ")[0].length)
      );
      const firstMaxLevelTitle = matches.find(
        (match) => match.split(" ")[0].length === maxLevel
      );
      titleText = firstMaxLevelTitle?.replace(/^(#{1,6})\s+/, "") || "";
      titleText = extractAndReplace(titleText);
    }
    const url = `https://mbf.tuhuyun.cn/${dataset}/${document}#${titleText}`;
    window.open(url, "_blank");
  };
  function extractAndReplace(str: string) {
    const matches = str.match(/[a-zA-Z\u4e00-\u9fa5]+/g);
    if (matches) {
      return matches.join('-').toLowerCase();
    }
    return '';
  }
  return (
    <>
      <div className="relative flex items-center mt-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-2 text-gray-500">引用</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {citation.map((item, index) => (
          <>
            <button
              key={index}
              data-tooltip-id={`tooltip-${item.segment_id}-${index}`}
              data-tooltip-place="top"
              className="border rounded-lg bg-white px-4 py-1 text-gray-700 hover:text-gray-900"
              onClick={() => jumpToMBFDocs(item)}
            >
              引用 {index + 1}
            </button>
            <Tooltip
              id={`tooltip-${item.segment_id}-${index}`}
              children={<Markdown content={item.content} />}
              clickable
              style={{
                backgroundColor: "#fff",
                color: "#222",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                zIndex: 9999,
              }}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default CitationList;
