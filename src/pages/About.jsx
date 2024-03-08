import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";
import downloadSpecificDocumentById from "../services/db/downloadSpecificDocumentById";

const About = () => {
  const [markdown, setMarkdown] = useState("## O projektu");
  const [textObj, setTextObj] = useState({});

  useEffect(() => {
    const getMarkdown = async () => {
      await downloadSpecificDocumentById("cloud_settings", "description", setTextObj);
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
      <Markdown rehypePlugins={[rehypeRaw]} >{markdown}</Markdown>

      <iframe src="https://docs.google.com/document/d/e/2PACX-1vSfnU-2GHDYICnGcswpsaklNFJF9C4VpsCnkIQbv9bH7EGkF1pi8d_Gx2d_LzfM8GzB4YF-7K2VCPAO/pub?embedded=true" className="w-full lg:w-10/12 min-h-screen"></iframe>
      <a href="https://firebasestorage.googleapis.com/v0/b/eburzaucebnicagkm.appspot.com/o/documents%2FProhl%C3%A1%C5%A1en%C3%AD%20o%20zpracov%C3%A1n%C3%AD%20osobn%C3%ADch%20%C3%BAdaj%C5%AF%20pro%20aplikaci%20_BurzAG_%20-%20Dokumenty%20Google.pdf?alt=media&token=906250bf-6635-4d6d-aea9-056c19bcfe8d" target="_blank" rel="noreferrer" className="blue-button">Prohlášení o zpracování osobních údajů</a>
 
    </div>
  );
};

export default About;
