"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFieldComp from "../form/FormFieldComp";
import { ArrowRightIcon, PlusIcon } from "../icons/Icons";
import CustomBtn from "../CustomBtn";
import { useFormData } from "./FormContext";
import { useUrlParams } from "@/hooks/useUrlParams";

const StepThree = ({ currentStep, setCurrentStep, btn = true, close }) => {
  const { formData, updateFormData } = useFormData();
  const { setParam } = useUrlParams();

  // State for deliverables with initial data from context if available
  const [deliverables, setDeliverables] = useState(
    formData.deliverables && formData.deliverables.length > 0
      ? formData.deliverables.map((item, index) => ({
          id: index + 1,
          ...item,
        }))
      : [{ id: 1, name: "", description: "", due_date: "" }]
  );

  // State for milestones with initial data from context if available
  const [milestones, setMilestones] = useState(
    formData.milestones && formData.milestones.length > 0
      ? formData.milestones.map((item, index) => ({
          id: index + 1,
          ...item,
        }))
      : [{ id: 1, name: "", description: "", due_date: "" }]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Transform the data to the desired structure
    const transformedData = {
      deliverables: deliverables.map((item) => ({
        name: data[`deliverableName_${item.id}`] || "",
        description: data[`deliverableDescription_${item.id}`] || "",
        due_date: data[`deliverableDueDate_${item.id}`] || "",
      })),
      milestones: milestones.map((item) => ({
        name: data[`milestoneName_${item.id}`] || "",
        description: data[`milestoneDescription_${item.id}`] || "",
        due_date: data[`milestoneDueDate_${item.id}`] || "",
      })),
    };

    // Save data to context
    updateFormData(transformedData);

    if (btn === true) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        setParam("step", (currentStep + 1).toString());
      }
    } else {
      console.log("close");

      close();
    }
  };

  // Function to add a new deliverable
  const addDeliverable = () => {
    const newId =
      deliverables.length > 0
        ? Math.max(...deliverables.map((d) => d.id)) + 1
        : 1;
    setDeliverables([
      ...deliverables,
      { id: newId, name: "", description: "", due_date: "" },
    ]);
  };

  // Function to add a new milestone
  const addMilestone = () => {
    const newId =
      milestones.length > 0 ? Math.max(...milestones.map((m) => m.id)) + 1 : 1;
    setMilestones([
      ...milestones,
      { id: newId, name: "", description: "", due_date: "" },
    ]);
  };

  // Function to remove a deliverable
  const removeDeliverable = (id) => {
    if (deliverables.length > 1) {
      setDeliverables(deliverables.filter((item) => item.id !== id));
    }
  };

  // Function to remove a milestone
  const removeMilestone = (id) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Deliverables Section */}
        <div className="bg-[#DEDEED] p-4 md:p-6 rounded-lg space-y-4">
          <div className="flex gap-4 justify-between items-center">
            <h2 className="font-semibold text-base md:text-xl ">
              Deliverables
            </h2>

            <CustomBtn
              variant="outlined"
              onClick={addDeliverable}
              type="button"
            >
              <div className="flex text-xs md:text-base md:gap-2 items-center">
                <PlusIcon /> Add Deliverables
              </div>
            </CustomBtn>
          </div>

          {deliverables.map((deliverable, index) => (
            <div
              key={deliverable.id}
              className="py-4  rounded-lg space-y-4 mt-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Deliverable {index + 1}</h3>
                {deliverables.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDeliverable(deliverable.id)}
                    className="text-red-500 text-xs md:text-base hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldComp
                  bg
                  label="Deliverable Name"
                  name={`deliverableName_${deliverable.id}`}
                  type="text"
                  defaultValue={deliverable.name || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Deliverable name is required" }}
                  errors={errors}
                />

                <FormFieldComp
                  bg
                  label="Due Date"
                  name={`deliverableDueDate_${deliverable.id}`}
                  type="date"
                  defaultValue={deliverable.due_date || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Due date is required" }}
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormFieldComp
                  bg
                  label="Description"
                  name={`deliverableDescription_${deliverable.id}`}
                  type="text"
                  textArea
                  defaultValue={deliverable.description || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Description is required" }}
                  errors={errors}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Milestones Section */}
        <div className="bg-[#DEDEED] p-6 rounded-lg space-y-4">
          <div className="flex gap-4 justify-between items-center">
            <h2 className="font-semibold text-base md:text-xl ">Milestones</h2>

            <CustomBtn variant="outlined" onClick={addMilestone} type="button">
              <div className="flex text-xs md:text-base md:gap-2 items-center">
                <PlusIcon /> Add Milestones
              </div>
            </CustomBtn>
          </div>

          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="md:p-4   rounded-lg space-y-4 mt-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Milestone {index + 1}</h3>
                {milestones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMilestone(milestone.id)}
                    className="text-red-500 text-xs md:text-base hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldComp
                  bg
                  label="Milestone Name"
                  name={`milestoneName_${milestone.id}`}
                  type="text"
                  defaultValue={milestone.name || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Milestone name is required" }}
                  errors={errors}
                />

                <FormFieldComp
                  bg
                  label="Due Date"
                  name={`milestoneDueDate_${milestone.id}`}
                  type="date"
                  defaultValue={milestone.due_date || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Due date is required" }}
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormFieldComp
                  bg
                  label="Description"
                  name={`milestoneDescription_${milestone.id}`}
                  type="text"
                  textArea
                  defaultValue={milestone.description || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Description is required" }}
                  errors={errors}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-6 items-center pt-4">
          {btn ? (
            <>
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
              <CustomBtn type="submit">
               Next <ArrowRightIcon />
              </CustomBtn>
            </>
          ) : (
            <CustomBtn type="submit">Save</CustomBtn>
          )}
        </div>
      </form>
    </div>
  );
};

export default StepThree;
