import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";
import downloadSpecificDocumentById from "../services/db/downloadSpecificDocumentById";

const About = () => {
  const [markdown, setMarkdown] = useState("## O projektu");
  const [textObj, setTextObj] = useState({});

  useEffect(() => {
    const getMarkdown = async () => {
      await downloadSpecificDocumentById("cloud_settings", "law", setTextObj);
    }
    getMarkdown();
  }, []);

  useEffect(() => {
    console.log(textObj);
    if (textObj) {
      setMarkdown(textObj.markdown);
    }
  }, [textObj]);
  return (
    <div className="card">
      <h1>O projektu</h1>
      <Markdown children={markdown} rehypePlugins={[rehypeRaw]} />
    </div>
  );
};

export default About;
