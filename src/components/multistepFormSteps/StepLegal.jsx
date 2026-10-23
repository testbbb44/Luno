"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ArrowRightIcon } from "../icons/Icons"
import CustomBtn from "../CustomBtn"
import { useFormData } from "./FormContext"
import LegalSectionsEditor from "../LegalSectionEditor"

const StepLegal = ({ currentStep, setCurrentStep, btn = true }) => {
  const { formData, updateFormData, updateTokenCounts } = useFormData()
  const [legalSections, setLegalSections] = useState(formData.legalSections || [])

  const {
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setLegalSections(formData.legalSections || [])
  }, [formData.legalSections])

  const onSubmit = () => {
    // Token counts for this step
    const stepTokens = {
      promptTokens: 6,
      completionTokens: 4,
      totalTokens: 10,
    }

    // Save data to context
    updateFormData({
      legalSections: legalSections,
    })

    // Update token counts (adding to existing)
    updateTokenCounts(stepTokens)

    // Move to the next step if not in modal mode
    if (currentStep < 6 && btn) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleLegalSectionsChange = (sections) => {
    setLegalSections(sections)
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <LegalSectionsEditor sections={legalSections} onChange={handleLegalSectionsChange} />

        {/* <div className="flex justify-end gap-6 items-center pt-4">
          <CustomBtn
            variant="outlined"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            type="button"
          >
            <ArrowRightIcon rotate /> Previous
          </CustomBtn>

          {btn && (
            <CustomBtn type="submit">
              Next <ArrowRightIcon />
            </CustomBtn>
          )}
        </div> */}
      </form>
    </div>
  )
}

export default StepLegal

