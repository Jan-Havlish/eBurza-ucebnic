import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
      <Markdown rehypePlugins={[rehypeRaw]} >{markdown}</Markdown>
  );
};

TextFromCloud.propTypes = {
    colId: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
};

export default TextFromCloud;
