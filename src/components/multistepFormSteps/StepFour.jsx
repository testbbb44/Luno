"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormFieldComp from "../form/FormFieldComp";
import { ArrowRightIcon, PlusIcon, VerifyIcon } from "../icons/Icons";
import CustomBtn from "../CustomBtn";
import { currencies } from "@/utils/tokenManager";
import { useFormData } from "./FormContext";
import { useApiPost } from "@/hooks/useApi";
import LoaderModal from "../LoaderModal";
import { useLoader } from "@/contexts/LoaderContext";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Minimize, Minimize2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/redux/loadingSlice";

const StepFour = ({ currentStep, setCurrentStep, btn = true, close }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, updateFormData } = useFormData();
  const { post, isLoading } = useApiPost();
  const { setParam } = useUrlParams();

  const { startLoading, completeLoading } = useLoader();

  // useEffect(() => {
  //   startLoading("posting data")
  // }, [])

  const allSections = [
    "DEFINITIONS",
    "REPRESENTATIONS AND WARRANTIES",
    "INDEMNIFICATION",
    "LIMITATION OF LIABILITY",
    "INSURANCE",
    "FORCE MAJEURE",
    "ASSIGNMENT",
    "NOTICES",
    "SEVERABILITY",
    "ENTIRE AGREEMENT",
    "AMENDMENTS",
    "DISPUTE RESOLUTION",
    "GOVERNING LAW AND JURISDICTION",
    "COMPLIANCE WITH LAWS",
    "NON-SOLICITATION",
    "INTELLECTUAL PROPERTY RIGHTS",
    "DATA PRIVACY AND SECURITY",
    "TERMINATION FOR CONVENIENCE",
    "SURVIVAL OF TERMS",
  ];

  // Convert section titles to keys (e.g., "LIMITATION OF LIABILITY" => "LIMITATION_OF_LIABILITY")
  const formatKey = (title) => title.replace(/\s+/g, "_").toUpperCase();

  // State for payments with initial data from context if available
  const [payments, setPayments] = useState(
    formData.payments && formData.payments.length > 0
      ? formData.payments.map((payment, index) => ({
          id: index + 1,
          ...payment,
        }))
      : [
          {
            id: 1,
            payment_schedule: "",
            payment_amount: "",
            payment_currency: "",
            payment_method: "",
          },
        ]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      selectedSections: {},
    },
  });

  const currencyOptions = currencies.map(({ country, currency }) => ({
    label: `${country} (${currency})`,
    value: currency,
  }));

  const scheduleOptions = [
    { label: "Up Front", value: "upfront" },
    { label: "Milestones", value: "milestones" },
    { label: "Deliverables", value: "deliverables" },
    { label: "Upon Completion", value: "upon completion" },
  ];

  const paymentMethodOptions = [
    { label: "Bank Transfer", value: "bank transfer" },
    { label: "Credit Card", value: "credit card" },
    { label: "PayPal", value: "paypal" },
    { label: "Cash", value: "cash" },
    { label: "Check", value: "check" },
    { label: "Cryptocurrency", value: "cryptocurrency" },
  ];

  const onSubmit = async (data) => {
    // Transform the data to the desired structure
    const transformedPayments = payments.map((payment) => ({
      payment_schedule: data[`paymentSchedule_${payment.id}`] || "",
      payment_amount:
        Number.parseFloat(data[`paymentAmount_${payment.id}`]) || 0,
      payment_currency: data[`paymentCurrency_${payment.id}`] || "",
      payment_method: data[`paymentMethod_${payment.id}`] || "",
    }));

    const selectedSections = Object.values(data.selectedSections || {});
    const isValid = selectedSections.some(Boolean);

    if (!isValid) {
      // Force trigger validation manually
      await trigger("selectedSections");
      return;
    }

    // console.log("Selected Sections:", data.selectedSections);
    // Proceed with form submission...

    const finalPayload = {
      ...formData,
      payments: transformedPayments,
      selectedSections: data.selectedSections,
    };

    // Save data to context
    // updateFormData({
    //   payments: transformedPayments,
    // });

    // console.log("Step 4 Data:", { payments: transformedPayments });

    if (btn === true) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        setParam("step", (currentStep + 1).toString());
      } else {
        // This is the final step, you might want to show a success message or redirect
        console.log(finalPayload);

        try {
          dispatch(toggleLoading());
          startLoading(
            "Generating Clauses this might take a while please wait..."
          );
          // Send data to API
          const result = await post("/generate-contract", finalPayload);

          if (result) {
            dispatch(toggleLoading());
            completeLoading("Contract clause generated successfully", () => {
              window.location.href = "/contract?step=5";
            });
            console.log("API Response:", result);

            // Extract suggested data safely
            const legalSections = result?.contract?.legal_section || [];

            const SuggestedPromptTokens =
              result?.total_prompt_tokens_used || null;
            const SuggestedCompletionTokens =
              result?.total_completion_tokens_used || null;
            const SuggestedTotalTokens = result?.total_tokens_used || null;

            let suggestedScope = result?.contract?.scope_of_work || "";

            // Attempt to parse `scope_of_work.raw` safely
            if (typeof result?.contract?.scope_of_work?.raw === "string") {
              try {
                // Fix any invalid control characters
                const sanitizedRaw = result.scope_of_work.raw.replace(
                  /[\x00-\x1F\x7F]/g,
                  ""
                );

                // Parse the sanitized JSON string
                const parsedData = JSON.parse(sanitizedRaw);
                suggestedScope = parsedData || suggestedScope;
              } catch (error) {
                console.error("Error parsing `scope_of_work.raw` JSON:", error);
              }
            }

            console.log("suggested scope", suggestedScope);

            // Update form context with form data and API suggestions

            updateFormData({
              ...formData,
              payments: transformedPayments,
              legalSections: legalSections,

              scopeContent: suggestedScope,
              promptTokens: formData.promptTokens + SuggestedPromptTokens,
              completionTokens:
                formData.completionTokens + SuggestedCompletionTokens,
              totalTokens: formData.totalTokens + SuggestedTotalTokens,
            });

            console.log({
              ...formData,
              payments: transformedPayments,
              legalSections: legalSections,

              scopeContent: suggestedScope,
              promptTokens: formData.promptTokens + SuggestedPromptTokens,
              completionTokens:
                formData.completionTokens + SuggestedCompletionTokens,
              totalTokens: formData.totalTokens + SuggestedTotalTokens,
            });

            // Move to the next step if applicable
            if (currentStep < 5 && btn) {
              setCurrentStep(5);
              setParam("step", (currentStep + 1).toString());
            }
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          dispatch(toggleLoading());
          // Update form context with only user-input data if API fails
          updateFormData({ ...formData, payments: transformedPayments });

          // Move to the next step if applicable
          if (currentStep < 5 && btn) {
            setCurrentStep(5);
            setParam("step", (currentStep + 1).toString());
          }
        }

        // window.location.href = "/editor";
      }
    } else {
      console.log("close");

      close();
    }
  };

  // Function to add a new payment
  const addPayment = () => {
    const newId =
      payments.length > 0 ? Math.max(...payments.map((p) => p.id)) + 1 : 1;
    setPayments([
      ...payments,
      {
        id: newId,
        payment_schedule: "",
        payment_amount: "",
        payment_currency: "",
        payment_method: "",
      },
    ]);
  };

  // Function to remove a payment
  const removePayment = (id) => {
    if (payments.length > 1) {
      setPayments(payments.filter((payment) => payment.id !== id));
    }
  };

  return (
    <div  className="mb-6  relative">
      {/* {isLoading && (
        <div className=" z-40 bg-[#ffffff75] gap-6 flex flex-col justify-center items-center absolute w-[100%] h-[100%]">
          <div className="loader-container">
            <img src={SmallLogo} alt="Loading..." className="loader-logo" />
          </div>
          <div className="flex flex-col text-sm gap-4 justify-center items-center">
            <i>Generating Please wait...</i>
            <Button
              onClick={() => navigate("/overview")}
              className="bg-primary-background text-white border border-black
                p-1 h-fit text-xs "
            >
              Minimize <Minimize2 />
            </Button>
          </div>
        </div>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#DEDEED] p-4 md:p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <h2 className="font-semibold text-base md:text-xl ">Payments</h2>
              <VerifyIcon />
            </div>

            <CustomBtn variant="outlined" onClick={addPayment} type="button">
              <div className="flex gap-2 items-center">
                <PlusIcon /> Add Payment
              </div>
            </CustomBtn>
          </div>

          {payments.map((payment, index) => (
            <div key={payment.id} className="md:p-4  rounded-lg space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Payment {index + 1}</h3>
                {payments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePayment(payment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldComp
                  bg
                  label="Payment Currency"
                  name={`paymentCurrency_${payment.id}`}
                  type="select"
                  defaultValue={payment.payment_currency || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Currency is required" }}
                  errors={errors}
                  options={currencyOptions}
                />

                <FormFieldComp
                  bg
                  label="Payment Amount"
                  name={`paymentAmount_${payment.id}`}
                  type="number"
                  defaultValue={payment.payment_amount || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Amount is required" }}
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldComp
                  bg
                  label="Payment Schedule"
                  name={`paymentSchedule_${payment.id}`}
                  type="select"
                  defaultValue={payment.payment_schedule || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Schedule is required" }}
                  errors={errors}
                  options={scheduleOptions}
                />

                <FormFieldComp
                  bg
                  label="Payment Method"
                  name={`paymentMethod_${payment.id}`}
                  type="select"
                  defaultValue={payment.payment_method || ""}
                  register={register}
                  setValue={setValue}
                  validation={{ required: "Payment method is required" }}
                  errors={errors}
                  options={paymentMethodOptions}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#DEDEED] md:p-6 p-4 rounded-lg space-y-4 mt-6">
          <div className="flex gap-4">
            <h2 className="font-semibold md:text-lg text-base ">
              {" "}
              Select Applicable Legal Sections
            </h2>
            <VerifyIcon />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2  ">
            {allSections.map((section, idx) => {
              const key = formatKey(section);
              return (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(`selectedSections.${key}`)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm ">
                    {section.charAt(0) +
                      section.slice(1, section.length).toLowerCase()}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Hidden input for validation */}
          <input
            type="hidden"
            {...register("selectedSections", {
              validate: (value) =>
                (value && Object.values(value).some(Boolean)) ||
                "At least one Legal section must be selected",
            })}
          />

          {errors.selectedSections && (
            <p className="text-red-500 text-sm">
              {errors.selectedSections.message}
            </p>
          )}
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

export default StepFour;
