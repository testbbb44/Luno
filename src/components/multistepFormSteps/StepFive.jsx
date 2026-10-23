"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFieldComp from "../form/FormFieldComp";
import { ArrowRightIcon, PlusIcon, VerifyIcon } from "../icons/Icons";
import CustomBtn from "../CustomBtn";
import { useFormData } from "./FormContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactQuill from "react-quill";
import { useUrlParams } from "@/hooks/useUrlParams";

const StepFive = ({ currentStep, setCurrentStep, btn = true, close }) => {
  const navigate = useNavigate();
  const { formData, updateFormData, getFormData } = useFormData();
  const { setParam } = useUrlParams();

  // State for clauses
  const [clauses, setClauses] = useState(
    formData.legalSections && formData.legalSections.length > 0
      ? formData.legalSections.map((clause, index) => ({
          id: index + 1,
          ...clause,
        }))
      : [{ id: 1, section: "", details: "" }]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   // Transform the data to the desired structure

  //   console.log(data);

  //   const transformedClauses = clauses.map((clause) => ({
  //     section: data[`clauseName_${clause.id}`] || "",
  //     details: data[`clauseDescription_${clause.id}`] || "",
  //   }));

  //   // Create a complete data object that includes the current clauses
  //   const completeFormData = {
  //     ...getFormData(),
  //     legalSections: transformedClauses,
  //   };

  //   // Log the complete form data with the current clauses
  //   console.log("Complete Form Data:", completeFormData);

  //   console.log("Complete Form Data:", transformedClauses);

  //   // Save clauses data to context (for persistence if needed later)
  //   updateFormData(completeFormData);

  //   if (btn === true) {
  //     if (currentStep < 5) {
  //       setCurrentStep(currentStep + 1);
  //     } else {
  //       // This is the final step, you might want to show a success message or redirect
  //       window.location.href = "/editor";
  //       // contract_auth
  //     }
  //   } else {
  //     console.log("close");

  //     close();
  //   }
  // };

  // Function to add a new clause

  const onSubmit = (data) => {
    console.log(data);

    // Transform the data while preserving original values for unedited fields
    const transformedClauses = clauses.map((clause) => {
      // Get the form values if they exist
      const newName = data[`clauseName_${clause.id}`];
      const newDetails = data[`clauseDescription_${clause.id}`];

      return {
        // Keep original value if the form field is undefined or empty
        section: newName !== undefined ? newName : clause.section || "",
        details: newDetails !== undefined ? newDetails : clause.details || "",
      };
    });

    // Create a complete data object that includes the current clauses
    const completeFormData = {
      ...getFormData(),
      legalSections: transformedClauses,
    };

    // Log the complete form data with the current clauses
    console.log("Complete Form Data:", completeFormData);
    console.log("Transformed Clauses:", transformedClauses);

    // Save clauses data to context (for persistence if needed later)
    updateFormData(completeFormData);

    if (btn === true) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        setParam("step", (currentStep + 1).toString());
      } else {
        // This is the final step, you might want to show a success message or redirect
        window.location.href = "/editor";
      }
    } else {
      console.log("close");
      close();
    }
  };

  const addClause = () => {
    const newId =
      clauses.length > 0 ? Math.max(...clauses.map((c) => c.id)) + 1 : 1;
    setClauses([...clauses, { id: newId, section: "", details: "" }]);
  };

  // Function to remove a clause
  const removeClause = (id) => {
    if (clauses.length > 1) {
      setClauses(clauses.filter((clause) => clause.id !== id));
    }
  };

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
    <div className="mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#DEDEED] p-2 md:p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <h2 className="font-semibold text-lg md:text-xl ">
                Legal Section
              </h2>
              <VerifyIcon />
            </div>

            <CustomBtn variant="outlined" onClick={addClause} type="button">
              <div className="flex gap-2 items-center">
                <PlusIcon /> Add Clause
              </div>
            </CustomBtn>
          </div>

          {clauses.map((clause, index) => (
            <div
              key={clause.id}
              className="p-1 md:p-4 rounded-lg space-y-4 mt-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Clause {index + 1}</h3>
                {clauses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClause(clause.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormFieldComp
                  bg
                  label="Clause Name"
                  name={`clauseName_${clause.id}`}
                  type="text"
                  defaultValue={clause.section || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Clause name is required" }}
                  errors={errors}
                />
              </div>

              <ReactQuill
                // theme="snow"
                value={marked.parse(clause.details)}
                onChange={(content) => {
                  const fieldName = `clauseDescription_${clause.id}`;
                  setValue(fieldName, content);
                }}
                modules={modules}
                formats={formats}
                style={{
                  // maxHeight: "500px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  border: "none",
                  backgroundColor: "white",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-6 items-center pt-4">
          {btn ? (
            <>
              {" "}
              <CustomBtn
                variant="outlined"
                disabled={currentStep === 1}
                onClick={() => {
                  setParam("step", Math.max(1, currentStep - 1).toString());
                  setCurrentStep(Math.max(1, currentStep - 1));
                }}
                type="button"
              >
                <ArrowRightIcon rotate /> Previous
              </CustomBtn>{" "}
              <CustomBtn type="submit">Submit Contract</CustomBtn>
            </>
          ) : (
            <CustomBtn type="submit">Save</CustomBtn>
          )}
        </div>
      </form>
    </div>
  );
};

export default StepFive;
