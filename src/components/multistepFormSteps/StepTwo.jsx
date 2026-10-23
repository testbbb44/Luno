"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFieldComp from "../form/FormFieldComp";
import CustomBtn from "../CustomBtn";
import { ArrowRightIcon } from "../icons/Icons";
import { useFormData } from "./FormContext";
import { toast } from "react-toastify";
import { useUrlParams } from "@/hooks/useUrlParams";

const StepTwo = ({ currentStep, setCurrentStep, btn = true, close }) => {
  const { formData, updateFormData } = useFormData();
  const { setParam } = useUrlParams();

  const [parties, setParties] = useState(
    formData.parties && formData.parties.length > 0
      ? formData.parties.map((party, index) => ({
          id: String.fromCharCode(65 + index),
          ...party,
        }))
      : [
          { id: "A", label: "Party A" },
          { id: "B", label: "Party B" },
        ]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  // const onSubmit = (data) => {
  //   // Transform the flat data into an array of party objects
  //   const transformedParties = parties.map((party) => {
  //     // Get the full name and split it into first and last name
  //     const fullName = data[`fullName${party.id}`] || "";
  //     const nameParts = fullName.split(" ");
  //     const firstName = nameParts[0] || "";
  //     const lastName = nameParts.slice(1).join(" ") || "";

  //     return {
  //       first_name: firstName,
  //       last_name: lastName,
  //       email_address: data[`email${party.id}`] || "",
  //       phone_number: data[`phone${party.id}`] || "",
  //       gender: data[`gender${party.id}`] || "",
  //       role: data[`role${party.id}`] || "",
  //     };
  //   });

  //   // Save data to context
  //   updateFormData({
  //     parties: transformedParties,
  //   });

  //   if (btn === true) {
  //     if (currentStep < 5) {
  //       setCurrentStep(currentStep + 1);
  //     }
  //   } else {
  //     close();
  //   }
  // };

  const onSubmit = (data) => {
    // Array to collect missing fields
    const missingFields = [];

    // Check each party for missing fields
    parties.forEach((party) => {
      // Check if fullName exists
      if (!data[`fullName${party.id}`]) {
        missingFields.push(`Full Name for Party ${party.id}`);
      } else {
        // Check if fullName contains both first and last name
        const nameParts = data[`fullName${party.id}`].trim().split(" ");
        if (nameParts.length < 2 || !nameParts[1]) {
          missingFields.push(
            `Last Name for Party ${party.id} (please enter full name with first and last name)`
          );
        }
      }

      // Check other required fields
      if (!data[`email${party.id}`]) {
        missingFields.push(`Email for Party ${party.id}`);
      }
      if (!data[`phone${party.id}`]) {
        missingFields.push(`Phone for Party ${party.id}`);
      }
      if (!data[`address${party.id}`]) {
        missingFields.push(`Address for Party ${party.id}`);
      }
      if (!data[`role${party.id}`]) {
        missingFields.push(`Role for Party ${party.id}`);
      }
    });

    // If there are missing fields, show toast and return early
    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    // If all fields are present, proceed with the original logic
    const transformedParties = parties.map((party) => {
      // Get the full name and split it into first and last name
      const fullName = data[`fullName${party.id}`];
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      return {
        first_name: firstName,
        last_name: lastName,
        email_address: data[`email${party.id}`],
        phone_number: data[`phone${party.id}`],
        address: data[`address${party.id}`],
        role: data[`role${party.id}`],
      };
    });

    // Save data to context
    updateFormData({
      parties: transformedParties,
    });

    if (btn === true) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        setParam("step", (currentStep + 1).toString());
      }
    } else {
      close();
    }
  };
  const addParty = () => {
    const nextPartyId = String.fromCharCode(65 + parties.length); // Convert to next letter (C, D, etc.)
    setParties([
      ...parties,
      { id: nextPartyId, label: `Party ${nextPartyId}` },
    ]);
  };

  const removeParty = (partyId) => {
    // Only allow removing if there's more than one party
    if (parties.length > 1) {
      setParties(parties.filter((party) => party.id !== partyId));
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        {parties.map((party) => (
          <div key={party.id} className="bg-[#DEDEED] p-6 rounded-lg space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg  font-semibold text-[#0A0A78]">
                  {party.label}
                </h2>
                <div className="w-5 h-5 rounded-full bg-[#0A0A78] text-white flex items-center justify-center text-xs">
                  {party.id}
                </div>
              </div>
              {parties.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParty(party.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldComp
                bg
                label="Full Name"
                name={`fullName${party.id}`}
                type="text"
                placeholder="Enter full name"
                defaultValue={
                  formData.parties && formData.parties[parties.indexOf(party)]
                    ? `${
                        formData.parties[parties.indexOf(party)].first_name ||
                        ""
                      } ${
                        formData.parties[parties.indexOf(party)].last_name || ""
                      }`
                    : ""
                }
                register={register}
                setValue={setValue}
                validation={{ required: "Full name is required" }}
                errors={errors}
              />

              <FormFieldComp
                bg
                label="Email"
                name={`email${party.id}`}
                type="email"
                placeholder="Enter email"
                defaultValue={
                  formData.parties && formData.parties[parties.indexOf(party)]
                    ? formData.parties[parties.indexOf(party)].email_address ||
                      ""
                    : ""
                }
                register={register}
                setValue={setValue}
                validation={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldComp
                bg
                label="Phone Number"
                name={`phone${party.id}`}
                type="text"
                placeholder="Enter phone number"
                defaultValue={
                  formData.parties && formData.parties[parties.indexOf(party)]
                    ? formData.parties[parties.indexOf(party)].phone_number ||
                      ""
                    : ""
                }
                register={register}
                setValue={setValue}
                validation={{ required: "Phone number is required" }}
                errors={errors}
              />

              {/* <FormFieldComp
                bg
                label="Gender"
                name={`gender${party.id}`}
                type="select"
                defaultValue={
                  formData.parties && formData.parties[parties.indexOf(party)]
                    ? formData.parties[parties.indexOf(party)].gender || ""
                    : ""
                }
                register={register}
                setValue={setValue}
                validation={{ required: "Gender is required" }}
                errors={errors}
                options={genderOptions}
              /> */}

              <FormFieldComp
                bg
                label="Address"
                name={`address${party.id}`}
                type="address"
                placeholder="Enter address"
                defaultValue={
                  formData.parties && formData.parties[parties.indexOf(party)]
                    ? formData.parties[parties.indexOf(party)].address || ""
                    : ""
                }
                register={register}
                setValue={setValue}
                validation={{
                  required: "Address is required",
                }}
                textArea={true}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormFieldComp
                bg
                label="Role"
                name={`role${party.id}`}
                type="text"
                placeholder="Enter full name"
                defaultValue={
                  formData.parties && formData.parties[parties.indexOf(party)]
                    ? formData.parties[parties.indexOf(party)].role || ""
                    : ""
                }
                register={register}
                setValue={setValue}
                validation={{ required: "Role  is required" }}
                errors={errors}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addParty}
          className="w-full py-4 text-[#0A0A78] bg-[#DEDEED] rounded-lg hover:bg-[#EEEEFF] transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Add Another Party
        </button>

        <div className="flex justify-end gap-6 items-center pt-4">
          {btn ? (
            <>
              <CustomBtn
                variant="outlined"
                disabled={currentStep === 1}
                onClick={() => {
                  setCurrentStep(Math.max(1, currentStep - 1));
                  setParam("step", Math.max(1, currentStep - 1).toString());
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

export default StepTwo;
