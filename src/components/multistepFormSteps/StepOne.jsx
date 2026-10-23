"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormFieldComp from "../form/FormFieldComp";
import { ArrowRightIcon, VerifyIcon } from "../icons/Icons";
import CustomBtn from "../CustomBtn";
import { useFormData } from "./FormContext";
import { useApiPost } from "@/hooks/useApi";
import LoaderModal from "../LoaderModal";
import { useUrlParams } from "@/hooks/useUrlParams";

const StepOne = ({ currentStep, setCurrentStep, btn = true, close }) => {
  // Get form data and update function from context
  const { formData, updateFormData } = useFormData();
  const { post, isLoading } = useApiPost();
  const {  setParam } = useUrlParams();

  // Initialize form with values from context or empty strings
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: formData.title || "",
      description: formData.description || "",
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
      jurisdiction: formData.jurisdiction || "",
    },
  });

  // Update form values when context data changes
  useEffect(() => {
    setValue("title", formData.title || "");
    setValue("description", formData.description || "");
    setValue("startDate", formData.startDate || "");
    setValue("endDate", formData.endDate || "");
    setValue("jurisdiction", formData.jurisdiction || "");
  }, [formData, setValue]);

  // const onSubmit = async (data) => {
  //   // Prepare data for API request
  //   const newFormData = {
  //     title: data.title,
  //     description: data.description,
  //     startDate: data.startDate,
  //     endDate: data.endDate,
  //     jurisdiction: data.jurisdiction || "",
  //   };
  //   if (btn === true) {
  //     try {
  //       // Send data to API
  //       const result = await post("/contracts/suggestions", newFormData);

  //       if (result) {
  //         console.log("API Response:", result);

  //         let parsedScope = "Loading...";

  //         try {
  //           const parsedData = JSON.parse(result?.scope_of_work?.scope?.raw);
  //           parsedScope = parsedData.scope;
  //         } catch (error) {
  //           console.log(error);

  //           parsedScope = "Failed to load scope of work.";
  //         }

  //         // Extract suggested data from API response
  //         const suggestedMilestones = result.milestones?.milestones || [];
  //         const suggestedDeliverables = result.deliverables?.deliverables || [];
  //         const suggestedClauses = result.clauses?.clauses || [];
  //         const suggestedScope =
  //           result.scope_of_work?.scope || parsedScope || "";

  //         const tokenusage = result?.token_usage;

  //         // Update form context with both form data and API suggestions
  //         updateFormData({
  //           // Step 1 data
  //           title: data.title,
  //           description: data.description,
  //           startDate: data.startDate,
  //           endDate: data.endDate,
  //           jurisdiction: data.jurisdiction || "",
  //           milestones: suggestedMilestones,
  //           deliverables: suggestedDeliverables,
  //           clauses: suggestedClauses,
  //           scopeContent: suggestedScope,
  //           promptTokens: tokenusage?.prompt_tokens,
  //           completionTokens: tokenusage?.completion_tokens,
  //           totalTokens: tokenusage?.total_tokens,
  //         });

  //         // Move to next step if not in modal mode
  //         if (currentStep < 5 && btn) {
  //           setCurrentStep(currentStep + 1);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching suggestions:", error);

  //       // Still update form context with form data even if API fails
  //       updateFormData({
  //         title: data.title,
  //         description: data.description,
  //         startDate: data.startDate,
  //         endDate: data.endDate,
  //         jurisdiction: data.jurisdiction || "",
  //       });

  //       // Move to next step if not in modal mode
  //       if (currentStep < 5 && btn) {
  //         setCurrentStep(currentStep + 1);
  //       }
  //     }
  //   } else {
  //     updateFormData({
  //       title: data.title,
  //       description: data.description,
  //       startDate: data.startDate,
  //       endDate: data.endDate,
  //       jurisdiction: data.jurisdiction || "",
  //     });
  //     close();
  //   }
  // };

  const onSubmit = async (data) => {
    // Prepare data for API request
    const newFormData = {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      jurisdiction: data.jurisdiction || "",
    };

    const formDatas = {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    if (btn === true) {
      try {
        // Send data to API
        const result = await post("/contracts/suggestions", formDatas);

        if (result) {
          console.log("API Response:", result);

          // Extract suggested data safely
          const suggestedMilestones = result?.milestones?.milestones || [];
          // const legalSections = result?.contract_analysis?.legal_sections || []
          const suggestedDeliverables =
            result?.deliverables?.deliverables || [];
          const SuggestedPromptTokens = result?.promptTokens || null;
          const SuggestedCompletionTokens = result?.completionTokens || null;
          const SuggestedTotalTokens = result?.totalTokens || null;

          // let suggestedScope = result?.scope_of_work?.scope || "";

          // Attempt to parse `scope_of_work.raw` safely
          // if (typeof result?.scope_of_work?.raw === "string") {
          //   try {
          //     // Fix any invalid control characters
          //     const sanitizedRaw = result.scope_of_work.raw.replace(
          //       /[\x00-\x1F\x7F]/g,
          //       ""
          //     );

          //     // Parse the sanitized JSON string
          //     const parsedData = JSON.parse(sanitizedRaw);
          //     suggestedScope = parsedData.scope || suggestedScope;
          //   } catch (error) {
          //     console.error("Error parsing `scope_of_work.raw` JSON:", error);
          //   }
          // }

          // console.log("suggested scope", suggestedScope);

          // Update form context with form data and API suggestions
          updateFormData({
            ...newFormData,
            // legalSections:legalSections,
            milestones: suggestedMilestones,
            deliverables: suggestedDeliverables,
            // scopeContent: suggestedScope,
            promptTokens: SuggestedPromptTokens,
            completionTokens: SuggestedCompletionTokens,
            totalTokens: SuggestedTotalTokens,
          });

          // Move to the next step if applicable
          if (currentStep < 5 && btn) {
            setCurrentStep((prevStep) => prevStep + 1);
            setParam("step", "2");
          }
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);

        // Update form context with only user-input data if API fails
        updateFormData(newFormData);

        // Move to the next step if applicable
        // if (currentStep < 5 && btn) {
        //   setCurrentStep((prevStep) => prevStep + 1);
        // }
      }
    } else {
      // Update form context with initial form data and close modal
      updateFormData(newFormData);
      close();
    }
  };

  return (
    <div className="mb-6">
      {isLoading && <LoaderModal />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#DEDEED] p-6 rounded-lg space-y-4">
          <div className="flex gap-4">
            <h2 className="font-semibold text-lg md:text-xl ">Scope</h2>
            <VerifyIcon />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <FormFieldComp
              bg
              label="Contract Title"
              name="title"
              type="text"
              placeholder="Enter contract title"
              defaultValue={formData.title || ""}
              register={register}
              setValue={setValue}
              validation={{ required: "Contract title is required" }}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldComp
              bg
              label="Start Date"
              name="startDate"
              type="date"
              defaultValue={formData.startDate || ""}
              register={register}
              setValue={setValue}
              validation={{ required: "Start date is required" }}
              errors={errors}
            />

            <FormFieldComp
              bg
              label="End Date"
              name="endDate"
              type="date"
              defaultValue={formData.endDate || ""}
              register={register}
              setValue={setValue}
              validation={{ required: "End date is required" }}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <FormFieldComp
              bg
              label="Jurisdiction"
              name="jurisdiction"
              type="text"
              placeholder="Enter jurisdiction"
              defaultValue={formData.jurisdiction || ""}
              register={register}
              setValue={setValue}
              validation={{ required: "Jurisdiction is required" }}
              errors={errors}
            />
          </div>
        </div>

        <div className="bg-[#DEDEED] p-6 rounded-lg space-y-4">
          <div className="flex gap-4">
            <h2 className="font-semibold text-lg md:text-xl ">
              Project Description
            </h2>
            <VerifyIcon />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <FormFieldComp
              bg
              label="Description"
              textArea
              name="description"
              type="text"
              placeholder="Enter project description"
              defaultValue={formData.description || ""}
              register={register}
              setValue={setValue}
              validation={{ required: "Description is required" }}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-6 items-center pt-4">
          {btn ? (
            <CustomBtn type="submit" disabled={isLoading}>
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Next <ArrowRightIcon />
                </>
              )}
            </CustomBtn>
          ) : (
            <CustomBtn type="submit" disabled={isLoading}>
              save
            </CustomBtn>
          )}
        </div>
      </form>
    </div>
  );
};

export default StepOne;
