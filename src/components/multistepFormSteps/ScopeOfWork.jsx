"use client";

import { useState, useEffect } from "react";
import { ArrowRightIcon } from "../icons/Icons";
import CustomBtn from "../CustomBtn";
import { useFormData } from "./FormContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Turndown from "turndown";
import { marked } from "marked";

// Initialize turndown service (HTML to Markdown converter)
const turndownService = new Turndown();

const StepScope = ({ currentStep, setCurrentStep, close }) => {
  const { formData, updateFormData } = useFormData();

  // Initialize with form data or empty string if not available
  const initialContent = formData?.scopeContent || "";

  // Store markdown content for saving to form context
  const [markdownContent, setMarkdownContent] = useState(initialContent);
  // Store HTML content for the editor
  const [editorContent, setEditorContent] = useState("");

  // Convert initial markdown to HTML when component mounts
  useEffect(() => {
    if (initialContent) {
      const html = marked.parse(initialContent);
      setEditorContent(html);
    }
  }, [initialContent]);

  // Save content to form context
  const handleSave = () => {
    // Convert current HTML to Markdown
    const markdown = turndownService.turndown(editorContent);
    setMarkdownContent(markdown);

    // Update form context with the markdown content
    updateFormData({ scopeContent: markdown });

    close();

    // Optionally move to next step
    // setCurrentStep(currentStep + 1);
  };

  // Handle continuing to next step
  const handleContinue = () => {
    // Save current content before moving to next step
    handleSave();
    // Move to next step
    setCurrentStep(currentStep + 1);
  };

  // Quill editor modules and formats configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  return (
    <div className="space-y-6">

      <div className=" rounded-md">
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          modules={modules}
          formats={formats}
          style={{ height: "500px", marginBottom: "50px", borderRadius:"20px" }}
        />
      </div>

      <div className="flex justify-end ">
       
<CustomBtn  onClick={handleSave} type="button">
           Save
          </CustomBtn>
      </div>
    </div>
  );
};

export default StepScope;
