import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import downloadSpecificDocumentById from "../services/db/downloadSpecificDocumentById";

const TextFromCloud = (props) => {
  const {colId, docId} = props
  const [markdown, setMarkdown] = useState("## O projektu");
  const [textObj, setTextObj] = useState({});

  useEffect(() => {
    const getMarkdown = async () => {
      await downloadSpecificDocumentById(colId, docId, setTextObj);
    }
    getMarkdown();
  }, [colId, docId]);

  useEffect(() => {
    console.log(textObj);
    if (textObj) {
      setMarkdown(textObj.markdown);
    }
  }, [textObj]);

  return (
    <div className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-semibold my-3" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-medium my-2" {...props} />,
          p: ({node, ...props}) => <p className="my-2" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
          li: ({node, ...props}) => <li className="my-1" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-400 hover:underline" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

TextFromCloud.propTypes = {
  colId: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};

export default TextFromCloud;